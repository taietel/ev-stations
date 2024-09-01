import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchQueryDto } from './dto/search.query.dto';

@Controller()
export class SearchController {
  constructor(private readonly searchServiceService: SearchService) {}

  @Get('search-typesense')
  async typesenseSearch(@Query() stationQueryDto: SearchQueryDto) {
    const { company_id, lat, long, distance } = stationQueryDto;
    return this.searchServiceService.searchStations(
      company_id,
      lat,
      long,
      distance,
    );
  }
}
