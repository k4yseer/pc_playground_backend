import { Test, TestingModule } from '@nestjs/testing';
import { PsuService } from './psu.service';

describe('PsuService', () => {
  let service: PsuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PsuService],
    }).compile();

    service = module.get<PsuService>(PsuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
