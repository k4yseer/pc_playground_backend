import { Test, TestingModule } from '@nestjs/testing';
import { CpuCaseService } from './cpu_case.service';

describe('CpuCaseService', () => {
  let service: CpuCaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CpuCaseService],
    }).compile();

    service = module.get<CpuCaseService>(CpuCaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
