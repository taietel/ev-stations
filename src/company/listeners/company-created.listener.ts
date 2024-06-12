import { Injectable } from '@nestjs/common';
import { CompanyCreatedEvent } from '../events/company-created.event';
import { OnEvent } from '@nestjs/event-emitter';
import { DataSource } from 'typeorm';
import { Company } from '../entities/company.entity';
import { TypesenseService } from '../../typesense/typesense.service';

@Injectable()
export class CompanyCreatedListener {
  constructor(
    private dataSource: DataSource,
    private typesenseService: TypesenseService,
  ) {}

  @OnEvent('company.created')
  async handleStationCreated(event: Company) {
    const parentCompany = await this.dataSource
      .getRepository(Company)
      .findOneBy({ id: event.parent_company.id });

    // create index for station in typesense
    const companyDocument = {
      company_id: event.id,
      name: event.name,
      parent_id: event.parent_company.id,
    };

    this.typesenseService.addDocument('companies', companyDocument);
  }
}
