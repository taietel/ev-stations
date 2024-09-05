import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { ICompanyIndex } from './interfaces/company.index.interface';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const company = new Company();
    company.parent_company = await this.getParentCompany(createCompanyDto);
    company.name = createCompanyDto.name;

    return this.companyRepository.manager.save(company);
  }

  async findAll() {
    return this.companyRepository.find();
  }

  findOne(id: number) {
    console.log(id);
    return this.companyRepository.findOneBy({ id });
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return this.companyRepository.update(id, updateCompanyDto);
  }

  async remove(id: number) {
    return this.companyRepository.delete(id);
  }

  getCompaniesWithParentCompany() {
    return this.companyRepository.find({ relations: ['parent_company'] });
  }

  async getCompaniesForIndexing(): Promise<ICompanyIndex[]> {
    // transform companies to typesense schema
    const companies = await this.getCompaniesWithParentCompany();

    return companies.map((company) => {
      return {
        company_id: company.id.toString(),
        name: company.name,
        parent_id: company.parent_company?.id ?? null,
      };
    });
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
