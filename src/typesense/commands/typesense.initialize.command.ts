import { Command, CommandRunner } from 'nest-commander';
import { TypesenseService } from '../typesense.service';

import stationTypesenseSchema from '../../station/schemas/station.typesense.schema';

import { CompanyService } from '../../company/company.service';
import { StationService } from '../../station/station.service';
import { Injectable } from '@nestjs/common';

@Injectable()
@Command({
  name: 'ts:reindex',
  description: 'Initialize Typesense collections and re-index typesense',
})
export class TypesenseInitializeCommand extends CommandRunner {
  static description = 'Initialize Typesense collections';

  constructor(
    private readonly typesenseService: TypesenseService,
    private readonly companyService: CompanyService,
    private readonly stationService: StationService,
  ) {
    super();
  }

  async run(): Promise<void> {
    await this.typesenseService.deleteCollections(['stations']);
    this.typesenseService.createCollection(stationTypesenseSchema).then(() => {
      this.indexStations();
    });
  }

  async indexStations() {
    const stations = await this.stationService.getStationsForIndexing();
    this.typesenseService.bulkImportDocuments('stations', stations);
  }
}
