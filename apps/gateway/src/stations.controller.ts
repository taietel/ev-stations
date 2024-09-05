import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateStationDto } from '../../distribution/src/station/dto/create-station.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('/stations')
export class StationsController {
  constructor(
    @Inject('DISTRIBUTION_SERVICE') private stationsClient: ClientProxy,
  ) {}

  @Get('/')
  getStations() {
    return this.stationsClient.send('get-stations', {});
  }

  @Get('/index')
  indexStations() {
    return this.stationsClient.emit('index-stations', {});
  }

  @Get('/:id')
  getStation(@Param('id') id: number) {
    return this.stationsClient.send('get-station', { id });
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
  removeStation(@Param('id') id: number) {
    return this.stationsClient.send('remove-station', { id });
  }
}