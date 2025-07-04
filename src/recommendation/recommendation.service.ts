import { Injectable } from '@nestjs/common';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { UpdateRecommendationDto } from './dto/update-recommendation.dto';
import { CpuService } from 'src/pc_sim/cpu/cpu.service';

@Injectable()
export class RecommendationService {
    constructor(private readonly cpuService: CpuService) {}

  
  create(createRecommendationDto: CreateRecommendationDto) {
    return 'This action adds a new recommendation';
  }

  findAll() {
    return `This action returns all recommendation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recommendation`;
  }

  update(id: number, updateRecommendationDto: UpdateRecommendationDto) {
    return `This action updates a #${id} recommendation`;
  }

  remove(id: number) {
    return `This action removes a #${id} recommendation`;
  }
  async getGameSpecs() {
    
  }

  async getCpuRecomendation(cpu_code: number, cpu_tier: number) {
    //return this.cpuService.findAll();
    console.log(cpu_code);
    
    let cpuAll = await this.cpuService.findAll();
    
     const cpuFilter = cpuAll.filter(cpu=> {
      if (cpu.brand == 'Intel') {
        return Number(cpu.cpu_tier) >= cpu_tier && Number(cpu.cpu_code) >= cpu_code;
      }
      else if (cpu.brand == 'AMD') {  
        return Number(cpu.cpu_tier) >= cpu_tier && Number(cpu.cpu_code) >= cpu_code;
      }
      return false;
    });
    console.log(cpuFilter);
    
    return cpuFilter
  }

  async getGPURecomendation() {}
}
