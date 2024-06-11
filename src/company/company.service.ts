import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, TreeRepository } from 'typeorm';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    @InjectRepository(Company)
    private companyTreeRepository: TreeRepository<Company>,
    private dataSource: DataSource,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const company = new Company();

    company.parent = await this.getParentCompany(createCompanyDto);
    company.name = createCompanyDto.name;
    company.address = createCompanyDto.address;

    return this.dataSource.manager.save(company);
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
    // move children to parent

    return this.companyRepository.delete(id);
  }

  private async getParentCompany(createCompanyDto: CreateCompanyDto) {
    if (!createCompanyDto.company) {
      return null;
    }
    return this.companyRepository.findOneBy({ id: createCompanyDto.company });
  }
}
