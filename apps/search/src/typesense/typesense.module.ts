import { Global, Module } from '@nestjs/common';
import { TypesenseService } from './typesense.service';

@Global()
@Module({
  imports: [],
  providers: [TypesenseService],
  exports: [TypesenseService],
})
export class TypesenseModule {}
