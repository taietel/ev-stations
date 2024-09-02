import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { TypesenseService } from './typesense/typesense.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'STATIONS_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'redis_db',
        },
      },
    ]),
  ],
  controllers: [SearchController],
  providers: [SearchService, TypesenseService],
})
export class SearchModule {}
