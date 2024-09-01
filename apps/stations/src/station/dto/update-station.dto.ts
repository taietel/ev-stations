import { CreateStationDto } from './create-station.dto';
import { OmitType } from '@nestjs/swagger';

export class UpdateStationDto extends OmitType(CreateStationDto, ['company']) {}
