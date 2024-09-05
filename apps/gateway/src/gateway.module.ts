import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
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
        name: 'DISTRIBUTION_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'redis_db',
        },
      },
    ]),
  ],
  controllers: [GatewayController, CompaniesController, StationsController],
  providers: [GatewayService],
})
export class GatewayModule {}
