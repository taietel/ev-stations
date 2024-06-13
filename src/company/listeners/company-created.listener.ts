import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Repository } from 'typeorm';
import { Company } from '../entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompanyCreatedListener {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
  ) {
    // private typesenseService: TypesenseService,
  }

  @OnEvent('company.created')
  async handleStationCreated(event: Company) {
    const parentCompany = await this.companyRepository.manager
      .getRepository(Company)
      .findOneBy({ id: event.parent_company?.id });

    console.log('EVENT', event, parentCompany);

    // create index for station in typesense
    const companyDocument = {
      company_id: event.id,
      name: event.name,
      parent_id: event.parent_company?.id,
    };

    // this.typesenseService.addDocument('companies', companyDocument);
  }
}
