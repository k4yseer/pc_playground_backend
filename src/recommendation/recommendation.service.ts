import { Injectable } from '@nestjs/common';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { UpdateRecommendationDto } from './dto/update-recommendation.dto';
import { CpuService } from 'src/pc_sim/cpu/cpu.service';
import { CpuCaseService } from 'src/pc_sim/cpu_case/cpu_case.service';
import { CpuCoolerService } from 'src/pc_sim/cpu_cooler/cpu_cooler.service';
import { GameService } from 'src/pc_sim/game/game.service';
import { GpuService } from 'src/pc_sim/gpu/gpu.service';
import { MotherboardService } from 'src/pc_sim/motherboard/motherboard.service';
import { RamService } from 'src/pc_sim/ram/ram.service';
import { PsuService } from 'src/pc_sim/psu/psu.service';
import { SsdService } from 'src/pc_sim/ssd/ssd.service';
import { log } from 'console';

@Injectable()
export class RecommendationService {

    constructor(private readonly cpuService: CpuService, private readonly gameService: GameService) {}

  
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
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  async getGameSpecs(gameName:string) {
    let gameAll = await this.gameService.findAll();
    const game = gameAll.find(gameProduct => gameProduct.game == gameName)

    const regexPattern = new RegExp("(Intel|AMD)\\s+(Core(?: Ultra)?|Ryzen)\\s*(?:i)?\\s*([3579])\\s*-?\\s*([A-Za-z]*)(\\d{3,5})([A-Za-z+]*)?","gi")

    if (game) {
      // const testString = "Intel Core i5-8400 / AMD Ryzen 5 1600";
      // const matches = Array.from(testString.matchAll(regexPattern));
      // console.log(matches);
      let gameCpuRequirements = game.processor
      //console.log(gameCpuRequirements)
      const cpuRequirements = Array.from(gameCpuRequirements.matchAll(regexPattern))

      console.log(cpuRequirements)
      var intel_cpu_tier = 0
      var intel_cpu_code = 0
      var amd_cpu_tier = 1
      var amd_cpu_code = 0

      for (const requirement of cpuRequirements) {
        let brandRequirement = new Map<string,string>()
        brandRequirement.set('brand',requirement[1])
        brandRequirement.set('tier',requirement[3])
        brandRequirement.set('code',requirement[5])

        //console.log(brandRequirement.get('brand'))
        if (brandRequirement.get('brand') == 'Intel') {
          intel_cpu_tier = Number(brandRequirement.get('tier'))
          intel_cpu_code = Number(brandRequirement.get('code'))
          //console.log(intel_cpu_code)
        }
        else if (brandRequirement.get('brand') == 'AMD') {
          amd_cpu_tier = Number(brandRequirement.get('tier'))
          amd_cpu_code = Number(brandRequirement.get('code'))
         // console.log(amd_cpu_code)
          
        }   
      }
      //console.log(intel_cpu_tier,intel_cpu_code,amd_cpu_tier,amd_cpu_code)
      return (this.getCpuRecomendation(intel_cpu_tier,intel_cpu_code,amd_cpu_tier,amd_cpu_code)) 
    };
    
    }

  async getCpuRecomendation(intel_cpu_tier,intel_cpu_code,amd_cpu_tier,amd_cpu_code) {
    // let cpu_tier = 5
    // let cpu_code = 8400
    // let cpu_brand = 'Intel'
    //console.log(intel_cpu_tier,intel_cpu_code,amd_cpu_tier,amd_cpu_code)
    let cpuAll = await this.cpuService.findAll();
    
    const cpuFilter = cpuAll.filter(cpu=> {
      if (cpu.brand == 'Intel') {
        //console.log('intel')
        return Number(cpu.cpu_tier) >= intel_cpu_tier && Number(cpu.cpu_code) >= intel_cpu_code;
      }

      if (cpu.brand == 'AMD') {
        //console.log('AMD')
        //console.log(cpu.cpu_tier, amd_cpu_tier)
        return Number(cpu.cpu_tier) >= amd_cpu_tier && Number(cpu.cpu_code) >= amd_cpu_code;
      }
    });

    //console.log(cpuFilter);
    
    return cpuFilter
  }

}
