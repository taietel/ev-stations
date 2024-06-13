import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Station } from '../station/entities/station.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

import AppConfig from '../config/app.config';
import { DataSourceOptions } from 'typeorm';

describe('CompanyService', () => {
  let service: CompanyService;
  let module: TestingModule;

  beforeAll(async () => {
    jest.setTimeout(10000);
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
            return configService.get<DataSourceOptions>('database');
          },
          inject: [ConfigService],
        }),
      ],
      providers: [CompanyService, ConfigService],
    }).compile();
    service = module.get<CompanyService>(CompanyService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
