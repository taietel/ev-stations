import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { StationService } from './station.service';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { ApiTags } from '@nestjs/swagger';
import { TypesenseService } from '../typesense/typesense.service';
import { StationQueryDto } from './dto/station.query.dto';

@ApiTags('Station')
@Controller('station')
export class StationController {
  constructor(
    private readonly stationService: StationService,
    private readonly typesenseService: TypesenseService,
  ) {}

  @Get('search')
  async dbSearch(@Query() stationQueryDto: StationQueryDto) {
    const { company_id, lat, long, distance } = stationQueryDto;
    const distanceInMeters = distance * 1000;

    return this.stationService.getStations({
      company_id,
      lat,
      long,
      distance: distanceInMeters,
    });
  }

  @Get('search-typesense')
  async typesenseSearch(
    @Query('company_id') companyId: number,
    @Query('lat') lat: number,
    @Query('long') long: number,
    @Query('distance') distance: number,
  ) {
    return this.typesenseService.getStations(companyId, lat, long, distance);
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
