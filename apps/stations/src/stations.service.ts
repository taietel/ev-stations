import { Injectable, Param } from '@nestjs/common';
import { CompanyService } from './company/company.service';
import { StationService } from './station/station.service';
import { CreateCompanyDto } from './company/dto/create-company.dto';
import { CreateStationDto } from './station/dto/create-station.dto';

@Injectable()
export class StationsService {
  constructor(
    private companyService: CompanyService,
    private stationService: StationService,
  ) {}

  async createCompany(data: CreateCompanyDto) {
    return this.companyService.create(data);
  }

  async getCompanies() {
    return this.companyService.findAll();

    // return this.companyService.getCompaniesForIndexing();
  }

  async updateCompany(id: number, data: CreateCompanyDto) {
    return this.companyService.update(id, data);
  }

  async removeCompany(id: number) {
    return this.companyService.remove(id);
  }

  async createStation(data: CreateStationDto) {
    return this.stationService.create(data);
  }

  async updateStation(id: number, data: CreateStationDto) {
    return this.stationService.update(id, data);
  }

  async getStations() {
    return this.stationService.findAll();
  }

  async getStation(id: number) {
    return this.stationService.findOne(id);
  }

  async removeStation(id: number) {
    return this.stationService.remove(id);
  }

  async getStationsForIndexing() {
    return this.stationService.getStationsForIndexing();
  }

  async getNearbyStations(
    @Param()
    params: {
      company_id: number;
      lat: number;
      long: number;
      distance: number;
    },
  ) {
    return this.stationService.fetchNearbyStations(params);
  }
}
