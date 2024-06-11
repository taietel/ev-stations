import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationModule } from './station/station.module';
import { DataSource } from 'typeorm';
import { CompanyModule } from './company/company.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'ev_stations',
      entities: [],
      synchronize: true, // don't use it in production!
      autoLoadEntities: true,
    }),
    EventEmitterModule.forRoot(),
    StationModule,
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
