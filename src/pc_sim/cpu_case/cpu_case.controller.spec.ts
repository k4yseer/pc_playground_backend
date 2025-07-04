import { Test, TestingModule } from '@nestjs/testing';
import { CpuCaseController } from './cpu_case.controller';
import { CpuCaseService } from './cpu_case.service';

describe('CpuCaseController', () => {
  let controller: CpuCaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CpuCaseController],
      providers: [CpuCaseService],
    }).compile();

    controller = module.get<CpuCaseController>(CpuCaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
