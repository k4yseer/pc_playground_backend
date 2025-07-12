import { Test, TestingModule } from '@nestjs/testing';
import { ThreeJsModelsService } from './three-js-models.service';

describe('ThreeJsModelsService', () => {
  let service: ThreeJsModelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThreeJsModelsService],
    }).compile();

    service = module.get<ThreeJsModelsService>(ThreeJsModelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
