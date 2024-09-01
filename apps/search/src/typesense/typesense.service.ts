import { Injectable } from '@nestjs/common';
import Typesense, { Client } from 'typesense';
import companyTypesenseSchema from './schemas/company.typesense.schema';
import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';
import { typesenseConfig } from '../config/typesense.config';

@Injectable()
export class TypesenseService {
  private readonly client: Client;

  constructor() {
    console.log('TypesenseService constructor', typesenseConfig);
    this.client = new Typesense.Client(typesenseConfig);
  }

  createCollection(schema: typeof companyTypesenseSchema) {
    try {
      return this.client.collections().create(schema as CollectionCreateSchema);
    } catch (error) {
      // if (error.message.includes('already exists')) {
      //   // console.log('Collection already exists');
      // } else {
      //   console.error('Error creating collection:', error);
      // }
    }
  }

  async deleteCollections(collections: string[]) {
    try {
      for (const collection of collections) {
        await this.client.collections(collection).delete();
      }
    } catch (error) {
      // @TODO handle error - commented for now because of e2e tests
      // console.error('Error deleting collections:', error);
    }
  }

  addDocument(collectionName: string, document: any) {
    this.client.collections(collectionName).documents().create(document);
  }

  bulkImportDocuments(collectionName: string, documents: any[]) {
    this.client.collections(collectionName).documents().import(documents);
  }

  getStations(company_id: number, lat: number, long: number, distance: number) {
    return this.client
      .collections('stations')
      .documents()
      .search({
        q: '*',
        filter_by: `ancestors:=[${company_id}] && location:(${lat}, ${long}, ${distance} km)`,
        sort_by: `location(${lat}, ${long}, precision: 3 km):asc`,
        per_page: 30,
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

  async indexStations(stations: any[]) {
    try {
      this.bulkImportDocuments('stations', stations);
    } catch (error) {
      // @TODO handle error - commented for now because of e2e tests
      // console.error('Error indexing stations:', error.importResults);
    }
  }
}
