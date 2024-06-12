import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { Company } from './entities/company.entity';
import { createMock } from '@golevelup/ts-jest';
import { DataSource } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('CompanyController', () => {
  let companyController: CompanyController;
  let companyService: CompanyService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        CompanyService,
        {
          provide: DataSource,
          useValue: createMock<DataSource>(),
        },
        {
          provide: 'CompanyRepository',
          useValue: createMock<Company>(),
        },
        {
          provide: 'EventEmitter2',
          useValue: createMock<EventEmitter2>(),
        },
      ],
    }).compile();

    companyController = module.get<CompanyController>(CompanyController);
    companyService = module.get<CompanyService>(CompanyService);
  });

  it('should be defined', () => {
    expect(companyController).toBeDefined();
  });

  describe('create', () => {
    it('should return a company', () => {
      const company = {
        id: 1,
        name: 'Company Name',
        address: 'Company Address',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
        parent_company: null,
        children: [],
        stations: [],
      };

      // jest.spyOn(companyService, 'create').mockImplementation(() => company);
      expect(companyController.create(company)).toBe(company);
    });
  });

  describe('findAll', () => {
    it('should return an array of companies', async () => {
      const companies = [
        {
          id: 1,
          name: 'Company Name',
          address: 'Company Address',
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
          parent: null,
          children: [],
          stations: [],
        },
      ];

      // jest.spyOn(companyService, 'findAll').mockImplementation(() => companies);

      expect(await companyController.findAll()).toBe(companies);
    });
  });
});
