import { Injectable } from '@nestjs/common';
import Typesense, { Client } from 'typesense';
import companyTypesenseSchema from '../company/schemas/company.typesense.schema';
import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';

@Injectable()
export class TypesenseService {
  private readonly client: Client;

  constructor() {
    // @TODO move this to a config file
    this.client = new Typesense.Client({
      nodes: [
        {
          host: 'typesense',
          port: 8108,
          protocol: 'http',
        },
      ],
      apiKey: 'xyz',
      connectionTimeoutSeconds: 10,
      logLevel: 'debug',
    });
  }

  createCollection(schema: typeof companyTypesenseSchema) {
    try {
      return this.client.collections().create(schema as CollectionCreateSchema);
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log('Collection already exists');
      } else {
        console.error('Error creating collection:', error);
      }
    }
  }

  async deleteCollections(collections: string[]) {
    try {
      for (const collection of collections) {
        await this.client.collections(collection).delete();
      }
    } catch (error) {
      console.error('Error deleting collections:', error);
    }
  }

  addDocument(collectionName: string, document: any) {
    console.log('Adding document', document);
    this.client.collections(collectionName).documents().create(document);
    console.log('Adding document');
  }

  bulkImportDocuments(collectionName: string, documents: any[]) {
    this.client.collections(collectionName).documents().import(documents);
    console.log('Importing documents');
  }

  search(company_id: number, lat: number, long: number) {
    return this.client.collections('stations').documents().search({
      q: '*',
      // query_by: 'station_name',
      // filter_by: `company_id:${company_id}`,
      // sort_by: `location(${lat}, ${long}):asc`,
    });
  }

  allStations() {
    return this.client.collections('stations').retrieve();
  }

  async getAllRecords(collectionName: string) {
    try {
      return await this.client
        .collections(collectionName)
        .documents()
        .search({ q: '*' });
    } catch (error) {
      console.log({ error });
    }
  }

  getCollections() {
    return this.client.collections().retrieve();
  }

  async indexCompanies(companies: any[]) {
    console.log(companies);
    this.bulkImportDocuments('companies', companies);
  }

  async indexStations(stations: any[]) {
    // const stations = await this.stationService.getStationsForIndexing();
    this.bulkImportDocuments('stations', stations);
  }
}
