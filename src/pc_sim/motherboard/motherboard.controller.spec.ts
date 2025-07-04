import { Test, TestingModule } from '@nestjs/testing';
import { MotherboardController } from './motherboard.controller';
import { MotherboardService } from './motherboard.service';

describe('MotherboardController', () => {
  let controller: MotherboardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MotherboardController],
      providers: [MotherboardService],
    }).compile();

    controller = module.get<MotherboardController>(MotherboardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
