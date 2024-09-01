import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateStationDto } from '../../stations/src/station/dto/create-station.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('/stations')
export class StationsController {
  constructor(
    @Inject('STATIONS_SERVICE') private stationsClient: ClientProxy,
  ) {}

  @Get('/')
  getStations() {
    console.log('get-stations ----------------------------');
    return { message: 'get-stations' };
    // return this.stationsClient.send('get-stations', {});
  }

  @Get('/:id')
  getStation() {
    console.log('get-stations ----------------------------');
    return { message: 'get-stations' };
    // return this.stationsClient.send('get-station', {});
  }

  @Post('/')
  createStation(@Body() data: CreateStationDto) {
    return this.stationsClient.send('create-station', data);
  }

  @Patch('/:id')
  updateStation(@Body() data: CreateStationDto) {
    return this.stationsClient.send('update-station', data);
  }

  @Delete('/:id')
  removeStation() {
    return this.stationsClient.send('remove-station', {});
  }
}
