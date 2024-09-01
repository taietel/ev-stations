import { Test, TestingModule } from '@nestjs/testing';
import { StationsController } from './stations.controller';
import { StationsService } from './stations.service';

describe('StationsController', () => {
  let stationsController: StationsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StationsController],
      providers: [StationsService],
    }).compile();

    stationsController = app.get<StationsController>(StationsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(stationsController.getHello()).toBe('Hello World!');
    });
  });
});
