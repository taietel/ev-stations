import { Injectable } from '@nestjs/common';
import { StationCreatedEvent } from '../events/station-created.event';
import { OnEvent } from '@nestjs/event-emitter';
import { Repository } from 'typeorm';
import { Company } from '../../company/entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StationCreatedListener {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
  ) {}

  @OnEvent('station.created')
  async handleStationCreated(event: StationCreatedEvent) {
    const company = await this.companyRepository.manager
      .getRepository(Company)
      .findOneBy({ id: event.id });

    const ancestors = await this.companyRepository.manager
      .getTreeRepository(Company)
      .findAncestors(company);

    console.log('Ancestors', ancestors);

    // create index for station in typesense
  }
}
