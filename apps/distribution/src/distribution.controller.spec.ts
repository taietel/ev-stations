import { Test, TestingModule } from '@nestjs/testing';
import { DistributionController } from './distribution.controller';
import { DistributionService } from './distribution.service';

describe('DistributionController', () => {
  let stationsController: DistributionController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DistributionController],
      providers: [DistributionService],
    }).compile();

    stationsController = app.get<DistributionController>(
      DistributionController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(stationsController.getHello()).toBe('Hello World!');
    });
  });
});
