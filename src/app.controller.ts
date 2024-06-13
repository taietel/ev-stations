import { Controller, Get } from '@nestjs/common';
import companyTypesenseSchema from './company/schemas/company.typesense.schema';
import stationTypesenseSchema from './station/schemas/station.typesense.schema';
import relationTypesenseSchema from './station/schemas/relation.typesense.schema';
import { TypesenseService } from './typesense/typesense.service';
import { CompanyService } from './company/company.service';
import { StationService } from './station/station.service';

@Controller()
export class AppController {
  constructor(
    private readonly typesenseService: TypesenseService,
    private readonly companyService: CompanyService,
    private readonly stationService: StationService,
  ) {}

  // @REVIEW this code exist because I don't know how to create a command that can be run from CLI

  @Get('/typesense/initialize')
  async regenerateIndexes() {
    try {
      // Delete if the collection already exists from a previous example run

      await this.typesenseService.deleteCollections([
        'companies',
        'stations',
        'company_stations',
      ]);

      this.typesenseService.createCollection(companyTypesenseSchema);
      this.typesenseService.createCollection(stationTypesenseSchema);
      this.typesenseService.createCollection(relationTypesenseSchema);

      return 'success';
    } catch (error) {
      // do nothing
      console.log('ERROR-------------', error);
      return error;
    }
  }

  @Get('/typesense/collections')
  getCollections() {
    return this.typesenseService.getCollections();
  }

  @Get('/typesense/index-companies')
  async populateCompanies() {
    try {
      const companies = await this.companyService.getCompaniesForIndexing();
      return this.typesenseService.indexCompanies(companies);
    } catch (error) {
      console.log('ERROR-------------', error.importResults);
    }
  }

  @Get('/typesense/index-stations')
  async indexStations() {
    const stations = await this.stationService.getStationsForIndexing();
    return this.typesenseService.indexStations(stations);
  }
}
