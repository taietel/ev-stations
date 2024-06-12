import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Station } from '../station/entities/station.entity';
import { CompanyCreatedListener } from './listeners/company-created.listener';
import { TypesenseModule } from '../typesense/typesense.module';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Station]), TypesenseModule],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyCreatedListener],
  exports: [CompanyService],
})
export class CompanyModule {}
