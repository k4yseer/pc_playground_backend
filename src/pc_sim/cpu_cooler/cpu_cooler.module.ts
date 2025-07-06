import { Module } from '@nestjs/common';
import { CpuCoolerService } from './cpu_cooler.service';
import { CpuCoolerController } from './cpu_cooler.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CpuCooler } from './entities/cpu_cooler.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CpuCooler])], // Register the CpuCooler entity with TypeORM
  controllers: [CpuCoolerController],
  providers: [CpuCoolerService],
  exports : [CpuCoolerService]
})
export class CpuCoolerModule {}
