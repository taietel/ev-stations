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
import { CreateCompanyDto } from '../../distribution/src/company/dto/create-company.dto';

@Controller('/companies')
export class CompaniesController {
  constructor(
    @Inject('DISTRIBUTION_SERVICE') private distributionClient: ClientProxy,
  ) {}

  @Get('/')
  getCompanies() {
    return this.distributionClient.send('get-companies', {});
  }

  @Get('/:id')
  getCompany(@Param('id') id: number) {
    return this.distributionClient.send('get-company', { id });
  }

  @Post('/')
  createCompany(@Body() data: CreateCompanyDto) {
    return this.distributionClient.send('create-company', data);
  }

  @Patch('/:id')
  updateCompany(@Body() data: CreateCompanyDto) {
    return this.distributionClient.send('update-company', data);
  }

  @Delete('/:id')
  removeCompany() {
    return this.distributionClient.send('remove-company', {});
  }
}
