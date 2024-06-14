import { Injectable } from '@nestjs/common';
import { StationCreatedEvent } from '../events/station-created.event';
import { OnEvent } from '@nestjs/event-emitter';
import { Repository } from 'typeorm';
import { Company } from '../../company/entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TypesenseService } from '../../typesense/typesense.service';

@Injectable()
export class StationCreatedListener {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    private typesenseService: TypesenseService,
  ) {}

  @OnEvent('station.created')
  async handleStationCreated(event: StationCreatedEvent) {
    const company = await this.companyRepository.findOneBy({
      id: event.company,
    });

    const ancestors = await this.companyRepository.manager
      .getTreeRepository(Company)
      .findAncestors(company);

    const companyIds = ancestors.map((ancestor) => ancestor.id);
    const stationDocument = {
      id: event.id.toString(),
      company_id: event.company,
      name: event.name,
      location: [event.latitude, event.longitude],
      ancestors: companyIds,
    };
    this.typesenseService.addDocument('stations', stationDocument);
  }
}
