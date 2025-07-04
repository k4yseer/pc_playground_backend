import { Test, TestingModule } from '@nestjs/testing';
import { PsuController } from './psu.controller';
import { PsuService } from './psu.service';

describe('PsuController', () => {
  let controller: PsuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PsuController],
      providers: [PsuService],
    }).compile();

    controller = module.get<PsuController>(PsuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
