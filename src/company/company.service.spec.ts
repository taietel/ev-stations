import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';
import { createMock } from '@golevelup/ts-jest';
import { Company } from './entities/company.entity';

describe('CompanyService', () => {
  let service: CompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: 'CompanyRepository',
          useValue: createMock(Company),
        },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
