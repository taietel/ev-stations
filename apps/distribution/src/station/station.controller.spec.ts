import { Test, TestingModule } from '@nestjs/testing';
import { StationController } from './station.controller';
import { StationService } from './station.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '../company/entities/company.entity';
import { Station } from './entities/station.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import AppConfig from '../config/app.config';
import { DataSourceOptions } from 'typeorm';

describe('StationController', () => {
  let controller: StationController;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
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
      controllers: [StationController],
      providers: [StationService],
    }).compile();

    controller = module.get<StationController>(StationController);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
