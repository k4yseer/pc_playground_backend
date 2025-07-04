import { Test, TestingModule } from '@nestjs/testing';
import { CpuCoolerService } from './cpu_cooler.service';

describe('CpuCoolerService', () => {
  let service: CpuCoolerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CpuCoolerService],
    }).compile();

    service = module.get<CpuCoolerService>(CpuCoolerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
