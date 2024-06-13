import { Test, TestingModule } from '@nestjs/testing';
import { StationService } from './station.service';
import { Station } from './entities/station.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Company } from '../company/entities/company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import AppConfig from '../config/app.config';
import { DataSourceOptions } from 'typeorm';

describe('StationService', () => {
  let service: StationService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [StationService],
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
    }).compile();

    service = module.get<StationService>(StationService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a station', () => {
      const station = {
        id: 1,
        name: 'Station Name',
        address: 'Station Address',
        latitude: 0,
        longitude: 0,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
        company: 1,
      };

      jest
        .spyOn(service, 'create')
        .mockImplementation(async () => station as any);
    });
  });

  describe('findAll', () => {
    it('should return an array of stations', async () => {
      const stations = [
        {
          name: 'Station Name',
          address: 'Station Address',
          latitude: 0,
          longitude: 0,
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
          company: null,
        },
      ];

      jest
        .spyOn(service, 'findAll')
        .mockImplementation(async () => stations as any);
    });
  });

  describe('update', () => {
    it('should return a station', () => {
      const station = {
        name: 'Station Name updated',
        address: 'Station Address',
        latitude: 0,
        longitude: 0,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
        company: 1,
      };

      jest
        .spyOn(service, 'update')
        .mockImplementation(async () => station as any);
    });
  });
});
