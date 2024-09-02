import { Inject, Injectable, Param } from '@nestjs/common';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { Station } from './entities/station.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Point, Repository } from 'typeorm';
import { Company } from '../company/entities/company.entity';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class StationService {
  constructor(
    @InjectRepository(Station) private stationRepository: Repository<Station>,
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    @Inject('INDEX_SERVICE') private searchServiceClient: ClientProxy,
  ) {}

  async create(createStationDto: CreateStationDto) {
    const station = new Station({ ...createStationDto } as unknown as Station);
    station.geometry = {
      type: 'Point',
      coordinates: [station.latitude, station.longitude],
    };
    const response = this.stationRepository.save(station);
    const stationData = await response;
    const ancestorIds = await this.getAncestorIds(stationData.company);

    const indexData = {
      company_id: stationData.company.id,
      name: stationData.name,
      location: [stationData.latitude, stationData.longitude],
      ancestors: ancestorIds,
    };

    // TODO - send a message to the indexing service to index the new station
    this.searchServiceClient.emit('index_station', indexData);
    return response;
  }

  findAll() {
    return this.stationRepository.find();
  }

  findOne(id: number) {
    return this.stationRepository.findOneBy({ id });
  }

  update(id: number, updateStationDto: UpdateStationDto) {
    return this.stationRepository.update(id, updateStationDto);
  }

  remove(id: number) {
    return this.stationRepository.delete(id);
  }

  async indexAllStations() {
    const rawRecords = await this.stationRepository.find();

    const stationsData = await Promise.all(
      rawRecords.map(async (record) => {
        const ancestorIds = await this.getAncestorIds(record.company);
        return {
          company_id: record.company.id,
          name: record.name,
          location: [record.latitude, record.longitude],
          ancestors: ancestorIds,
        };
      }),
    );

    this.searchServiceClient.emit('index-stations', stationsData);
  }

  /**
   * Retrieves the ancestor IDs for a given company.
   * @param company The company entity
   * @returns The list of ancestor IDs
   */
  private async getAncestorIds(company: Company): Promise<number[]> {
    const ancestors = await this.companyRepository.manager
      .getTreeRepository(Company)
      .findAncestors(company);

    const ancestorIds = ancestors.map((ancestor) => ancestor.id);

    if (ancestorIds.length === 0) {
      ancestorIds.push(company.id);
    }

    return ancestorIds;
  }

  async fetchNearbyStations(
    @Param()
    params: {
      company_id: number;
      lat: number;
      long: number;
      distance: number;
    },
  ) {
    const root = await this.companyRepository.findOneBy({
      id: params.company_id,
    });
    if (!root) {
      return [];
    }

    const origin: Point = {
      type: 'Point',
      coordinates: [params.lat, params.long],
    };

    return this.companyRepository.manager
      .getTreeRepository(Company)
      .createDescendantsQueryBuilder('company', 'company_closure', root)
      .innerJoinAndSelect('company.stations', 'company_stations')
      .andWhere(
        'ST_DWithin(company_stations.geometry, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(company_stations.geometry)), :distance)',
      )
      .addSelect(
        'ST_Distance(company_stations.geometry, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(company_stations.geometry)))/1000',
        'stations_distance',
      )
      .orderBy(
        'ST_Distance(company_stations.geometry, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(company_stations.geometry)))',
        'ASC',
      )
      .setParameters({
        origin: JSON.stringify(origin),
        distance: params.distance,
      })
      .getMany();
  }
}
