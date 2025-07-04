import { Test, TestingModule } from '@nestjs/testing';
import { SsdService } from './ssd.service';

describe('SsdService', () => {
  let service: SsdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SsdService],
    }).compile();

    service = module.get<SsdService>(SsdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
