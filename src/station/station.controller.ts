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
import { TypesenseService } from '../typesense/typesense.service';
import { StationQueryDto } from './dto/station.query.dto';
import { Cache } from 'cache-manager';
import * as geohash from 'ngeohash';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@ApiTags('Station')
@Controller('station')
export class StationController {
  constructor(
    private readonly stationService: StationService,
    private readonly typesenseService: TypesenseService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get('search')
  async dbSearch(@Query() stationQueryDto: StationQueryDto) {
    const { company_id, lat, long, distance } = stationQueryDto;
    const distanceInMeters = distance * 1000;
    const cacheKey = `${geohash.encode(lat, long, 5)}:${distance}`;

    const cachedStations = await this.cacheManager.get(cacheKey);

    if (cachedStations) {
      return cachedStations;
    }

    const searchResponse = await this.stationService.getStations({
      company_id,
      lat,
      long,
      distance: distanceInMeters,
    });

    await this.cacheManager.set(cacheKey, searchResponse, 5 * 60000); // 30 minutes

    return searchResponse;
  }

  @Get('search-typesense')
  async typesenseSearch(@Query() stationQueryDto: StationQueryDto) {
    const { company_id, lat, long, distance } = stationQueryDto;
    return this.typesenseService.getStations(company_id, lat, long, distance);
  }

  @Post()
  async create(@Body() createStationDto: CreateStationDto) {
    const stationRecord = await this.stationService.create(createStationDto);
    // emit event
    this.stationService.emitStationCreatedEvent(stationRecord);

    return stationRecord;
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
