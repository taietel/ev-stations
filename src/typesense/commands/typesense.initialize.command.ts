import { Command, CommandRunner, Option } from 'nest-commander';
import * as console from 'node:console';
import { TypesenseService } from '../typesense.service';
import companyTypesenseSchema from '../../company/schemas/company.typesense.schema';
import stationTypesenseSchema from '../../station/schemas/station.typesense.schema';
import * as process from 'node:process';
import { CompanyService } from '../../company/company.service';
import { StationService } from '../../station/station.service';
import relationTypesenseSchema from '../../station/schemas/relation.typesense.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
// @Command({ name: 'typesense:initialize' })
@Command({
  name: 'reindex',
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

  async run(
    passedParams: string[],
    options?: Record<string, any>,
  ): Promise<void> {
    if (options.length === 0) {
      return this.runWithNoArguments(passedParams);
    } else {
      return this.runWithRegenerate(passedParams);
    }
  }

  @Option({
    flags: '-r, --regenerate [boolean]',
    description: 'Delete and recreate collections',
  })
  parseBoolean(val: string): boolean {
    return JSON.parse(val);
  }

  async runWithRegenerate(param: string[]) {
    try {
      // Delete if the collection already exists from a previous example run
      await this.typesenseService.deleteCollections([
        'companies',
        'stations',
        'company_stations',
      ]);

      await this.typesenseService.createCollection(companyTypesenseSchema);
      await this.typesenseService.createCollection(stationTypesenseSchema);
      await this.typesenseService.createCollection(relationTypesenseSchema);
      process.exit(0);
    } catch (error) {
      // do nothing
    }
  }
  async runWithNoArguments(param: string[]) {
    await this.typesenseService.createCollection(companyTypesenseSchema);
    await this.typesenseService.createCollection(stationTypesenseSchema);
    await this.typesenseService.createCollection(relationTypesenseSchema);
    process.exit(0);
  }

  async runIndexing(collectionName: string) {
    if (collectionName === 'companies') {
      const companies = await this.companyService.getCompaniesForIndexing();
      this.typesenseService.bulkImportDocuments(collectionName, companies);
      // process.exit(0);
      // Index companies
    } else if (collectionName === 'stations') {
      // const stations = await this.stationService.getStationsForIndexing();
      // this.typesenseService.bulkImportDocuments(collectionName, stations);
    }
  }

  async indexCompanies() {
    const companies = await this.companyService.getCompaniesForIndexing();
    this.typesenseService.bulkImportDocuments('companies', companies);
  }

  async indexStations() {
    const stations = await this.stationService.getStationsForIndexing();
    this.typesenseService.bulkImportDocuments('stations', stations);
  }
}
