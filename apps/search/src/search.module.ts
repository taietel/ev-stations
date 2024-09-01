import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { TypesenseService } from './typesense/typesense.service';

@Module({
  imports: [],
  controllers: [SearchController],
  providers: [SearchService, TypesenseService],
})
export class SearchModule {}
