import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service';
import { CpuController } from './cpu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cpu } from './entities/cpu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cpu])], // Add your entities here
  controllers: [CpuController],
  providers: [CpuService],
  exports: [CpuService]
})
export class CpuModule {}
