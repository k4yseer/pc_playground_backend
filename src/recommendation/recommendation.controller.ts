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

  @Get('cpu') // require list of gameId
  async cpu_recommendation(@Body() data) {
    let cpu_list = this.recommendationService.getGameCpuSpecs(data.gameId)
    return cpu_list }

  @Get('gpu') // require gameId
  async gpu_recommendation(@Body() data) {
    let gpu_list = this.recommendationService.getGameGpuSpecs(data.gameId)
    return gpu_list}

  @Get('motherboard') //require CpuIndex & gpuIndex
  async motherboard_recommendation(@Body() data) {
    let motherboard_list = this.recommendationService.getMotherboardRecommendation(data.cpuIndex,data.gpuIndex)
    return motherboard_list}

  @Get('cpu_cooler') // require CpuIndex
  async cpu_cooler_recommendation(@Body() data) {
    let cpu_cooler_list = this.recommendationService.getCpuCoolerRecommendation(data.cpuIndex)
    return cpu_cooler_list }

  @Get('ram') // require gameName & motherboardIndex
  async ram_recommendation(@Body() data) {
    let ram_list = this.recommendationService.getRamRecommendation(data.motherboardIndex,data.gameId)
    return ram_list}

  @Get ('ssd') // require gameName & motherboardIndex
  async ssd_recommendation(@Body() data) {
    let ssd_list = this.recommendationService.getSsdRecommendation(data.motherboardIndex,data.gameId)
    return ssd_list}
    
  @Get('psu') //require cpuIndex, gpuIndex, motherboardIndex
  async psu_recommendation(@Body() data) {
    let psu_list = this.recommendationService.getPsuRecommendation(data.cpuIndex,data.gpuIndex,data.motherboardIndex) 
    return psu_list}
    
  @Get('case') //require gpuIndex, coolerIndex, motherboardIndex, psuIndex
   async case_recommendation(@Body() data) {
    let case_list = this.recommendationService.getCaseRecommendation(data.gpuIndex,data.coolerIndex,data.motherboardIndex,data.psuIndex)
    return case_list
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
