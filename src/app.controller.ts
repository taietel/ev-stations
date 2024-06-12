import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { TypesenseService } from './typesense/typesense.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly typesenseService: TypesenseService,
  ) {}

  @Get('search')
  async search(
    @Query('company_id') companyId: number,
    @Query('lat') lat: number,
    @Query('long') long: number,
  ) {
    const searchResults = await this.typesenseService.search(
      companyId,
      lat,
      long,
    );
    console.log(searchResults);
  }

  @Get('stations')
  async allStations() {
    const stations = await this.typesenseService.allStations();

    return stations;
    console.log(stations);
  }

  @Get('/search-companies')
  async allCompanies() {
    const companies = await this.typesenseService.allCompanies();
    console.log(companies);
    return companies;
  }
}
