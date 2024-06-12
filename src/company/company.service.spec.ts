import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';
import { createMock } from '@golevelup/ts-jest';
import { Company } from './entities/company.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

describe('CompanyService', () => {
  let service: CompanyService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: getRepositoryToken(Company),
          useValue: createMock(Company),
        },
        // {
        //   provide: 'EventEmitter2',
        //   useValue: createMock(EventEmitter2),
        // },
        // {
        //   provide: getRepositoryToken(Company, 'default'),
        //   useValue: { save: jest.fn() },
        // },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
