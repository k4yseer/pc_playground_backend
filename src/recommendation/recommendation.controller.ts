import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { UpdateRecommendationDto } from './dto/update-recommendation.dto';
import { CpuService } from 'src/pc_sim/cpu/cpu.service';
import { GameService } from 'src/pc_sim/game/game.service';
@Controller('recommendation')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Post()
  create(@Body() createRecommendationDto: CreateRecommendationDto) {
    return this.recommendationService.create(createRecommendationDto);
  }

  @Get()
  async cpu_reccomendation(@Body() data) {
    let cpu_list = this.recommendationService.getGameCpuSpecs(data.gameName)
    let gpu_list = this.recommendationService.getGameGpuSpecs(data.gameName)
    let motherboard_list = this.recommendationService.getMotherboardRecommendation(data.cpuIndex,data.gpuIndex)
    let cpu_cooler_list = this.recommendationService.getCpuCoolerRecommendation(data.cpuIndex)
    return cpu_cooler_list
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recommendationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecommendationDto: UpdateRecommendationDto) {
    return this.recommendationService.update(+id, updateRecommendationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recommendationService.remove(+id);
  }
}
