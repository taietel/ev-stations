import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CompaniesController } from './companies.controller';
import { StationsController } from './stations.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SEARCH_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'redis_db',
        },
      },
      {
        name: 'STATIONS_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'redis_db',
        },
      },
    ]),
  ],
  controllers: [ApiGatewayController, CompaniesController, StationsController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
