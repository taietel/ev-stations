import { Injectable } from '@nestjs/common';
import { StationCreatedEvent } from '../events/station-created.event';
import { OnEvent } from '@nestjs/event-emitter';
import { DataSource } from 'typeorm';
import { Company } from '../../company/entities/company.entity';

@Injectable()
export class StationCreatedListener {
  constructor(private dataSource: DataSource) {}

  @OnEvent('station.created')
  async handleStationCreated(event: StationCreatedEvent) {
    const company = await this.dataSource
      .getRepository(Company)
      .findOneBy({ id: event.company });

    const ancestors = await this.dataSource
      .getTreeRepository(Company)
      .findAncestors(company);

    console.log('Ancestors', ancestors);

    // create index for station in typesense
  }
}
