import { Test, TestingModule } from '@nestjs/testing';
import { SsdController } from './ssd.controller';
import { SsdService } from './ssd.service';

describe('SsdController', () => {
  let controller: SsdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SsdController],
      providers: [SsdService],
    }).compile();

    controller = module.get<SsdController>(SsdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
