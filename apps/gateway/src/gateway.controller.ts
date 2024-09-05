import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { StationQueryDto } from '../../distribution/src/station/dto/station.query.dto';

@Controller('/')
export class GatewayController {
  constructor(@Inject('SEARCH_SERVICE') private searchClient: ClientProxy) {}

  @Get('/search')
  search(@Query() query: StationQueryDto) {
    console.log('search query', query);
    return this.searchClient.send('search', { ...query });
  }
}
