import { Controller, Param, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchQueryDto } from './dto/search.query.dto';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class SearchController {
  constructor(private readonly searchServiceService: SearchService) {}

  @MessagePattern('search')
  async typesenseSearch(stationQueryDto: SearchQueryDto) {
    console.log('stationQueryDto', stationQueryDto);

    const { company_id, lat, long, distance } = stationQueryDto;

    console.log(company_id, lat, long, distance);
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
