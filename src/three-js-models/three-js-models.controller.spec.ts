import { Test, TestingModule } from '@nestjs/testing';
import { ThreeJsModelsController } from './three-js-models.controller';
import { ThreeJsModelsService } from './three-js-models.service';

describe('ThreeJsModelsController', () => {
  let controller: ThreeJsModelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThreeJsModelsController],
      providers: [ThreeJsModelsService],
    }).compile();

    controller = module.get<ThreeJsModelsController>(ThreeJsModelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
