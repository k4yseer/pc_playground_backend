import { Module } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { RecommendationController } from './recommendation.controller';
import { CpuService } from 'src/pc_sim/cpu/cpu.service';
import { CpuModule } from 'src/pc_sim/cpu/cpu.module';
import { GameService } from 'src/pc_sim/game/game.service';
import { GameModule } from 'src/pc_sim/game/game.module';
import { GpuModule } from 'src/pc_sim/gpu/gpu.module';
import { MotherboardModule } from 'src/pc_sim/motherboard/motherboard.module';
import { CpuCaseModule } from 'src/pc_sim/cpu_case/cpu_case.module';
import { CpuCoolerModule } from 'src/pc_sim/cpu_cooler/cpu_cooler.module';
import { PsuModule } from 'src/pc_sim/psu/psu.module';
import { RamModule } from 'src/pc_sim/ram/ram.module';
import { SsdModule } from 'src/pc_sim/ssd/ssd.module';

@Module({
  imports: [
    CpuModule,
    GameModule,
    GpuModule,
    MotherboardModule,
    // CpuCaseModule,
    CpuCoolerModule,
    // PsuModule,
    // RamModule,
    // SsdModule
  ],
  controllers: [RecommendationController],
  providers: [RecommendationService],
})
export class RecommendationModule {}
