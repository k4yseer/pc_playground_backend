import { Module } from '@nestjs/common';
import { RamService } from './ram.service';
import { RamController } from './ram.controller';

@Module({
  controllers: [RamController],
  providers: [RamService],
})
export class RamModule {}
