import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('/')
export class ApiGatewayController {
  constructor(@Inject('SEARCH_SERVICE') private searchClient: ClientProxy) {}

  @Get('/search')
  search() {
    return this.searchClient.send('search', {});
  }
}
