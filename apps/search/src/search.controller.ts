import { Controller, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchQueryDto } from './dto/search.query.dto';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class SearchController {
  constructor(private readonly searchServiceService: SearchService) {}

  @MessagePattern('search-typesense')
  async typesenseSearch(@Query() stationQueryDto: SearchQueryDto) {
    const { company_id, lat, long, distance } = stationQueryDto;
    return this.searchServiceService.searchStations(
      company_id,
      lat,
      long,
      distance,
    );
  }

  @EventPattern('index-station')
  async typesenseIndexStation(station: any) {
    return this.searchServiceService.indexStation(station);
  }
}
