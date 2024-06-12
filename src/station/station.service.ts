import { Injectable } from '@nestjs/common';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { Station } from './entities/station.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { StationCreatedEvent } from './events/station-created.event';

@Injectable()
export class StationService {
  constructor(
    @InjectRepository(Station) private stationRepository: Repository<Station>,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createStationDto: CreateStationDto) {
    const station = new Station({ ...createStationDto } as unknown as Station);

    const stationRecord = await this.stationRepository.save(station);

    const event = new StationCreatedEvent();
    event.name = stationRecord.name;
    event.id = stationRecord.id;
    event.parent_company_id = stationRecord.company.id;
    event.address = stationRecord.address;
    event.latitude = stationRecord.latitude;
    event.longitude = stationRecord.longitude;

    this.eventEmitter.emit('station.created', event);

    return stationRecord;
  }

  findAll() {
    return this.stationRepository.find();
  }

  findOne(id: number) {
    return this.stationRepository.findOneBy({ id });
  }

  update(id: number, updateStationDto: UpdateStationDto) {
    console.log(updateStationDto);
    // return this.stationRepository.update(id, updateStationDto);
  }

  remove(id: number) {
    return this.stationRepository.delete(id);
  }
}
