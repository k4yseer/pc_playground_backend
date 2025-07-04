import { Test, TestingModule } from '@nestjs/testing';
import { RamController } from './ram.controller';
import { RamService } from './ram.service';

describe('RamController', () => {
  let controller: RamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RamController],
      providers: [RamService],
    }).compile();

    controller = module.get<RamController>(RamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
