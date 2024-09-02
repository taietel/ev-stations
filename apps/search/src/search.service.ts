import { Injectable } from '@nestjs/common';
import { TypesenseService } from './typesense/typesense.service';

@Injectable()
export class SearchService {
  constructor(private typesenseService: TypesenseService) {}

  async searchStations(
    company_id: number,
    lat: number,
    long: number,
    distance: number,
  ) {
    return this.typesenseService.getStations(company_id, lat, long, distance);
  }

  async indexStation(station: any) {
    this.typesenseService.addDocument('stations', station);
  }
}
