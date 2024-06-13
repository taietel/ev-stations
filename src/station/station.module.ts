import { Module } from '@nestjs/common';
import { StationService } from './station.service';
import { StationController } from './station.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Station } from './entities/station.entity';
import { Company } from '../company/entities/company.entity';
import { StationCreatedListener } from './listeners/station-created.listener';

@Module({
  imports: [TypeOrmModule.forFeature([Station, Company])],
  controllers: [StationController],
  providers: [StationService, StationCreatedListener],
  exports: [StationService],
})
export class StationModule {}
