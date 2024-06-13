import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Station } from '../station/entities/station.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import AppConfig from '../config/app.config';

describe('CompanyController', () => {
  let companyController: CompanyController;
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        EventEmitterModule.forRoot(),
        TypeOrmModule.forFeature([Company, Station]),
        ConfigModule.forRoot({
          isGlobal: false,
          load: [AppConfig],
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => {
            console.log(configService.get<DataSourceOptions>('database'));
            return configService.get<DataSourceOptions>('database');
          },
          inject: [ConfigService],
        }),
      ],
      controllers: [CompanyController],
      providers: [CompanyService],
    }).compile();

    companyController = module.get<CompanyController>(CompanyController);
    // companyService = module.get<CompanyService>(CompanyService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(companyController).toBeDefined();
  });

  // describe('create', () => {
  //   it('should return a company', async () => {
  //     const company = {
  //       name: 'Company Name',
  //       address: 'Company Address',
  //       created_at: new Date(),
  //       updated_at: new Date(),
  //       deleted_at: null,
  //       parent_company: null,
  //       children: [],
  //       stations: [],
  //     };
  //
  //     const companyRecord = await companyController.create(company);
  //
  //     expect(companyRecord.name).toBe(company.name);
  //   });
  // });

  // describe('findAll', () => {
  //   it('should return an array of companies', async () => {
  //     const companies = [
  //       {
  //         name: 'Company Name',
  //         address: 'Company Address',
  //         created_at: new Date(),
  //         updated_at: new Date(),
  //         deleted_at: null,
  //         parent: null,
  //         children: [],
  //         stations: [],
  //       },
  //     ];
  //
  //     const response = await companyController.findAll();
  //     expect(response.length).toBe(companies.length);
  //   });
  // });
});
