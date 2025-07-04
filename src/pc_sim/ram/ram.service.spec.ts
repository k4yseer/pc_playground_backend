import { Test, TestingModule } from '@nestjs/testing';
import { RamService } from './ram.service';

describe('RamService', () => {
  let service: RamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RamService],
    }).compile();

    service = module.get<RamService>(RamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
