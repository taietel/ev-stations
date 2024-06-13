import { Global, Module } from '@nestjs/common';
import { TypesenseService } from './typesense.service';
import { StationModule } from '../station/station.module';
import { CompanyModule } from '../company/company.module';

@Global()
@Module({
  imports: [StationModule, CompanyModule],
  providers: [TypesenseService],
  exports: [TypesenseService],
})
export class TypesenseModule {}
