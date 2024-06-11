import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { Company } from './entities/company.entity';
import { createMock } from '@golevelup/ts-jest';

describe('CompanyController', () => {
  let companyController: CompanyController;
  let companyService: CompanyService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        CompanyService,
        {
          provide: 'CompanyRepository',
          useValue: createMock<Company>(),
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
        parent: null,
        children: [],
        stations: [],
      };

      jest
        .spyOn(companyService, 'create')
        .mockImplementation(async () => company);
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

      jest
        .spyOn(companyService, 'findAll')
        .mockImplementation(async () => companies);

      expect(await companyController.findAll()).toBe(companies);
    });
  });
});
