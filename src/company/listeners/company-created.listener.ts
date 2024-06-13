import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Repository } from 'typeorm';
import { Company } from '../entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TypesenseService } from '../../typesense/typesense.service';

@Injectable()
export class CompanyCreatedListener {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    private typesenseService: TypesenseService,
  ) {}

  @OnEvent('company.created')
  async handle(event: Company) {
    const companyDocument = {
      company_id: event.id,
      name: event.name,
      parent_id: event.parent_company?.id,
    };

    this.typesenseService.addDocument('companies', companyDocument);
  }
}
