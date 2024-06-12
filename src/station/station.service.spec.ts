import { Test, TestingModule } from '@nestjs/testing';
import { StationService } from './station.service';
import { createMock } from '@golevelup/ts-jest';
import { Station } from './entities/station.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('StationService', () => {
  let service: StationService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StationService,
        {
          provide: 'StationRepository',
          useValue: createMock(Station),
        },
        {
          provide: 'EventEmitter2',
          useValue: createMock(EventEmitter2),
        },
      ],
      imports: [],
    }).compile();

    service = module.get<StationService>(StationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a station', () => {
      const station = {
        id: 1,
        name: 'Station Name',
        address: 'Station Address',
        latitude: 0,
        longitude: 0,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
        company: 1,
      };

      jest
        .spyOn(service, 'create')
        .mockImplementation(async () => station as any);
    });
  });

  describe('findAll', () => {
    it('should return an array of stations', async () => {
      const stations = [
        {
          id: 1,
          name: 'Station Name',
          address: 'Station Address',
          latitude: 0,
          longitude: 0,
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
          company: null,
        },
      ];

      jest
        .spyOn(service, 'findAll')
        .mockImplementation(async () => stations as any);
    });
  });

  describe('update', () => {
    it('should return a station', () => {
      const station = {
        id: 1,
        name: 'Station Name updated',
        address: 'Station Address',
        latitude: 0,
        longitude: 0,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
        company: 1,
      };

      jest
        .spyOn(service, 'update')
        .mockImplementation(async () => station as any);
    });
  });
});
