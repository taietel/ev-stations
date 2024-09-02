import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Inject,
} from '@nestjs/common';
import { StationService } from './station.service';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { ApiTags } from '@nestjs/swagger';
import { StationQueryDto } from './dto/station.query.dto';
import { ClientProxy } from '@nestjs/microservices';

@ApiTags('Station')
@Controller('station')
export class StationController {
  constructor(private readonly stationService: StationService) {}

  @Get('search')
  async dbSearch(@Query() stationQueryDto: StationQueryDto) {
    const { company_id, lat, long, distance } = stationQueryDto;
    const distanceInMeters = distance * 1000;
    return await this.stationService.fetchNearbyStations({
      company_id,
      lat,
      long,
      distance: distanceInMeters,
    });
  }

  // @Get('search-typesense')
  // async typesenseSearch(@Query() stationQueryDto: StationQueryDto) {
  //   const { company_id, lat, long, distance } = stationQueryDto;
  //   return this.typesenseService.getStations(company_id, lat, long, distance);
  // }

  @Post()
  async create(@Body() createStationDto: CreateStationDto) {
    return await this.stationService.create(createStationDto);
  }

  @Get()
  findAll() {
    return this.stationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStationDto: UpdateStationDto) {
    return this.stationService.update(+id, updateStationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stationService.remove(+id);
  }
}
