import { Module } from '@nestjs/common';
import { CompanyService } from 'src/company/company.service';
import { StationService } from 'src/station/station.service';

@Module({
  providers: [CompanyService, StationService],
  imports: [],
})
export class SeedModule {}
