import { Module } from '@nestjs/common';
import { RamService } from './ram.service';
import { RamController } from './ram.controller';
import { Ram } from './entities/ram.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Ram])],
  controllers: [RamController],
  providers: [RamService],
  exports: [RamService]
})
export class RamModule {}
