import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateCompanyDto } from '../src/company/dto/create-company.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should init indexes', () => {
    return request(app.getHttpServer())
      .get('/typesense/initialize')
      .expect(200);
  });

  it('should create a company', () => {
    const createCompanyDto: CreateCompanyDto = {
      name: 'Company Name',
      parent_company: null,
    };

    return request(app.getHttpServer())
      .post('/company')
      .send(createCompanyDto)
      .expect(201);
  });

  // it('populate typesense', async () => {
  //   return request(app.getHttpServer())
  //     .get('/typesense/index-stations')
  //     .expect(200);
  // });

  // it('should return some results from postgres db', () => {
  //   return request(app.getHttpServer()).get('/station/search').expect(200);
  // });
  //
  // it('should return some results from typesense', () => {
  //   return request(app.getHttpServer())
  //     .get('/station/search-typesense')
  //     .expect(200);
  // });

  afterAll(async () => {
    await app.close();
  });
});
