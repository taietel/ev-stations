import { Test, TestingModule } from '@nestjs/testing';
import { StationController } from './station.controller';
import { StationService } from './station.service';
import { createMock } from '@golevelup/ts-jest';
import { Station } from './entities/station.entity';

describe('StationController', () => {
  let controller: StationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StationController],
      providers: [
        StationService,
        {
          provide: 'StationRepository',
          useValue: createMock(Station),
        },
      ],
    }).compile();

    controller = module.get<StationController>(StationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
