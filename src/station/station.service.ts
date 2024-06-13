import { Injectable, Param } from '@nestjs/common';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { Station } from './entities/station.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Point, Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { StationCreatedEvent } from './events/station-created.event';
import { Company } from '../company/entities/company.entity';

@Injectable()
export class StationService {
  constructor(
    @InjectRepository(Station) private stationRepository: Repository<Station>,
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createStationDto: CreateStationDto) {
    const station = new Station({ ...createStationDto } as unknown as Station);
    station.geometry = {
      type: 'Point',
      coordinates: [station.latitude, station.longitude],
    };
    const stationRecord = await this.stationRepository.save(station);

    this.emitStationCreatedEvent(stationRecord);

    return stationRecord;
  }

  findAll() {
    return this.stationRepository.find();
  }

  findOne(id: number) {
    return this.stationRepository.findOneBy({ id });
  }

  update(id: number, updateStationDto: UpdateStationDto) {
    console.log(updateStationDto);
    // return this.stationRepository.update(id, updateStationDto);
  }

  remove(id: number) {
    return this.stationRepository.delete(id);
  }

  getStationsForIndexing() {
    return this.stationRepository.find();
  }

  async getStations(
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
      .createDescendantsQueryBuilder('company', 'company_closure_closure', root)
      .innerJoinAndSelect('company.stations', 'stations')
      .where(
        'ST_DWithin(stations.geometry, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(stations.geometry)), :distance)',
      )
      .addSelect(
        'ST_Distance(stations.geometry, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(stations.geometry)))/1000',
        'stations_distance',
      )
      .orderBy(
        'ST_Distance(stations.geometry, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(stations.geometry)))',
        'ASC',
      )
      .setParameters({
        origin: JSON.stringify(origin),
        distance: params.distance,
      })
      .getMany();
  }

  private emitStationCreatedEvent(stationRecord: Station) {
    const event = new StationCreatedEvent();
    event.name = stationRecord.name;
    event.id = stationRecord.id;
    event.parent_company_id = stationRecord.company.id;
    event.address = stationRecord.address;
    event.latitude = stationRecord.latitude;
    event.longitude = stationRecord.longitude;

    this.eventEmitter.emit('station.created', event);
  }
}
