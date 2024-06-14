import { Controller, Get } from '@nestjs/common';
import stationTypesenseSchema from './station/schemas/station.typesense.schema';
import { TypesenseService } from './typesense/typesense.service';
import { CompanyService } from './company/company.service';
import { StationService } from './station/station.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Utility endpoints to regenerate indexes')
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
      await this.typesenseService.deleteCollections(['stations']);
      return this.typesenseService.createCollection(stationTypesenseSchema);
    } catch (error) {
      return error;
    }
  }

  @Get('/typesense/index-stations')
  async indexStations() {
    const stations = await this.stationService.getStationsForIndexing();
    return this.typesenseService.indexStations(stations);
  }
}
