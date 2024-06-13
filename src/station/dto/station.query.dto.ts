import { IsNotEmpty, IsNumberString } from 'class-validator';

export class StationQueryDto {
  @IsNotEmpty()
  @IsNumberString()
  company_id: number;

  @IsNotEmpty()
  @IsNumberString()
  lat: number;

  @IsNotEmpty()
  @IsNumberString()
  long: number;

  @IsNotEmpty()
  @IsNumberString()
  distance: number;
}
