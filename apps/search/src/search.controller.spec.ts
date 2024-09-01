import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

describe('SearchServiceController', () => {
  let searchServiceController: SearchController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [SearchService],
    }).compile();

    searchServiceController = app.get<SearchController>(SearchController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(searchServiceController.getHello()).toBe('Hello World!');
    });
  });
});
