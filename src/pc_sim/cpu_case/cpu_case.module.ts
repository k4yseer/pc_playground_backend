import { Module } from '@nestjs/common';
import { CpuCaseService } from './cpu_case.service';
import { CpuCaseController } from './cpu_case.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CpuCase } from './entities/cpu_case.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CpuCase])], // Register the CpuCase entity with TypeORM
  controllers: [CpuCaseController],
  providers: [CpuCaseService],
  exports: [CpuCaseService]
})
export class CpuCaseModule {}
