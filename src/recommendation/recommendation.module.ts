import { Module } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { RecommendationController } from './recommendation.controller';
import { CpuService } from 'src/pc_sim/cpu/cpu.service';
import { CpuModule } from 'src/pc_sim/cpu/cpu.module';

@Module({
  imports: [CpuModule],
  controllers: [RecommendationController],
  providers: [RecommendationService],
})
export class RecommendationModule {}
