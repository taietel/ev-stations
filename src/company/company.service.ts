import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, TreeRepository } from 'typeorm';
import { Company } from './entities/company.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CompanyCreatedEvent } from './events/company-created.event';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    // @InjectRepository(Company)
    // private companyTreeRepository: TreeRepository<Company>,
    private dataSource: DataSource,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const company = new Company();
    company.parent_company = await this.getParentCompany(createCompanyDto);
    company.name = createCompanyDto.name;

    const companyRecord = await this.dataSource.manager.save(company);
    const event = new CompanyCreatedEvent();

    event.id = companyRecord.id;
    event.name = companyRecord.name;
    event.parent_company_id = companyRecord.parent_company?.id;

    this.eventEmitter.emit('company.created', companyRecord);

    return companyRecord;
  }

  findAll() {
    return this.companyRepository.find();
  }

  findOne(id: number) {
    return this.companyRepository.findOneBy({ id });
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return this.companyRepository.update(id, updateCompanyDto);
  }

  remove(id: number) {
    // @TODO move children to parent

    return this.companyRepository.delete(id);
  }

  getAllCompanies() {
    return this.companyRepository.find();
  }

  private async getParentCompany(createCompanyDto: CreateCompanyDto) {
    if (!createCompanyDto.parent_company) {
      return null;
    }
    return this.companyRepository.findOneBy({
      id: createCompanyDto.parent_company,
    });
  }
}
