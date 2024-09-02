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
import { ClientProxy } from '@nestjs/microservices';
import { CreateCompanyDto } from '../../stations/src/company/dto/create-company.dto';

@Controller('/companies')
export class CompaniesController {
  constructor(
    @Inject('STATIONS_SERVICE') private stationsClient: ClientProxy,
  ) {}

  @Get('/')
  getCompanies() {
    return this.stationsClient.send('get-companies', {});
  }

  @Get('/:id')
  getCompany(@Param('id') id: number) {
    return this.stationsClient.send('get-company', { id });
  }

  @Post('/')
  createCompany(@Body() data: CreateCompanyDto) {
    return this.stationsClient.send('create-company', data);
  }

  @Patch('/:id')
  updateCompany(@Body() data: CreateCompanyDto) {
    return this.stationsClient.send('update-company', data);
  }

  @Delete('/:id')
  removeCompany() {
    return this.stationsClient.send('remove-company', {});
  }
}
