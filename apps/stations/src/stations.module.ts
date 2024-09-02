import { Module } from '@nestjs/common';
import { StationsController } from './stations.controller';
import { StationsService } from './stations.service';
import { CompanyModule } from './company/company.module';
import { StationModule } from './station/station.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import AppConfig from './config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: false,
      load: [AppConfig],
    }),
    ClientsModule.registerAsync([
      {
        name: 'INDEX_SERVICE',
        useFactory: async () => ({
          // @TODO - use config
          transport: Transport.REDIS,
          options: {
            host: 'redis_db',
          },
        }),
      },
    ]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return configService.get<DataSourceOptions>('database');
      },
      inject: [ConfigService],
    }),
    CompanyModule,
    StationModule,
  ],
  controllers: [StationsController],
  providers: [StationsService],
})
export class StationsModule {}
