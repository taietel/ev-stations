import { Controller } from '@nestjs/common';
import { DistributionService } from './distribution.service';
import { CreateCompanyDto } from './company/dto/create-company.dto';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreateStationDto } from './station/dto/create-station.dto';

@Controller()
export class DistributionController {
  constructor(private readonly stationsService: DistributionService) {}

  @EventPattern('create-company')
  createCompany(data: CreateCompanyDto) {
    return this.stationsService.createCompany(data);
  }

  @EventPattern('update-company')
  updateCompany(data: { id: number; data: CreateCompanyDto }) {
    return this.stationsService.updateCompany(data.id, data.data);
  }

  @EventPattern('remove-company')
  removeCompany(id: number) {
    return this.stationsService.removeCompany(id);
  }

  @MessagePattern('get-companies')
  getCompanies() {
    return this.stationsService.getCompanies();
  }

  @EventPattern('create-station')
  createStation(data: CreateStationDto) {
    return this.stationsService.createStation(data);
  }

  @EventPattern('update-station')
  updateStation(data: { id: number; data: CreateStationDto }) {
    return this.stationsService.updateStation(data.id, data.data);
  }

  @EventPattern('remove-station')
  removeStation(id: number) {
    return this.stationsService.removeStation(id);
  }

  @MessagePattern('get-stations')
  getStations() {
    return this.stationsService.getStations();
  }

  @MessagePattern('get-station')
  getStation({ id }: { id: number }) {
    return this.stationsService.getStation(id);
  }

  // hack zone
  @EventPattern('index-stations')
  indexStations() {
    return this.stationsService.indexAllStations();
  }
}
