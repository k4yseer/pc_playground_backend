import { ConsoleLogger, Injectable } from '@nestjs/common';
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
import { retry } from 'rxjs';
import { randomFill } from 'crypto';
import { Psu } from 'src/pc_sim/psu/entities/psu.entity';

@Injectable()
export class RecommendationService {
  
  constructor(
    private readonly cpuService: CpuService, 
    private readonly gameService: GameService,
    private readonly gpuService:GpuService,
    private readonly motherboardService:MotherboardService,
    private readonly CpuCoolerService:CpuCoolerService,
    private readonly RamService:RamService,
    private readonly SsdService:SsdService,
    private readonly PsuService:PsuService,
    private readonly CpuCaseService:CpuCaseService) {}

  
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
  async getGameCpuSpecs(gameName:string) {
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

      //console.log(cpuRequirements)
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
    let cpuAll = await this.cpuService.findAll()
    
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

  async getGameGpuSpecs(gameName) {

    let gameAll = await this.gameService.findAll();
    const gameSpecs = gameAll.find(gameProduct => gameProduct.game == gameName)
    const regexPattern = new RegExp('\\b(RTX|GTX|RX)\\s*(\\d{3,4})\\b','gi');

    if (gameSpecs) {
      const gpuRequirements = Array.from(gameSpecs.graphics.matchAll(regexPattern))
      // console.log(gpuRequirements)
      var rx_type = ''
      var rx_chip = 0
      var rtx_type = ''
      var rtx_chip = 0
      for (const requirement of gpuRequirements) {
        let typeRequirement = new Map<string,string>()
        typeRequirement.set('chip', requirement[2])

        if (requirement[1] == 'GTX' || requirement[1] == 'RTX') {
          typeRequirement.set('type', 'RTX')
        }
        else {
          typeRequirement.set('type', requirement[1])
        }

        //console.log(requirement)

        if (typeRequirement.get('type') == 'RTX') {
          rtx_type = String(typeRequirement.get("type"))
          rtx_chip = Number(typeRequirement.get("chip"))
        }
        else if (typeRequirement.get('type') == 'RX') {
          rx_type = String(typeRequirement.get('type'))
          rx_chip = Number(typeRequirement.get('chip'))
        }
      }
      //console.log(rx_type,rx_chip,rtx_type,rtx_chip)
      return this.getGpuRecommendation(rx_type, rx_chip, rtx_type, rtx_chip)
    }
    // let rx_type = 'RX'
    // let rx_chip = 580
    // let rtx_type = "RTX"
    // let rtx_chip = 1060
    // return this.getGpuRecommendation(rx_type, rx_chip, rtx_type, rtx_chip)
    
  }

  async getGpuRecommendation(rx_type, rx_chip, rtx_type, rtx_chip) {
    let gpuAll = await this.gpuService.findAll()

    const gpuFilter = gpuAll.filter(gpu => {
      let gpu_spec = gpu.gpu_code.split(' ')
      let gpu_type = gpu_spec[0]
      let gpu_chip = Number(gpu_spec[1])
      //console.log(gpu_type,gpu_chip)
      if (gpu_type == rx_type) {
          return gpu_chip >= rx_chip
        }

      if (rtx_type == gpu_type) {
        return gpu_chip >= rtx_chip
      }
    })
    return gpuFilter
  }

  async getMotherboardRecommendation(cpuIndex,gpuIndex) {
    let cpuSpec = await this.cpuService.findOne(cpuIndex)
    let gpuSpec = await this.gpuService.findOne(gpuIndex)
    let motherboardAll = await this.motherboardService.findAll()

    if (cpuSpec && gpuSpec && motherboardAll) {
      let cpuSocket = cpuSpec.cpu_socket
      let gpuSocket = gpuSpec.gpu_interface //always PCIe x16

      const motherboardFilter = motherboardAll.filter(motherboard =>  
        motherboard.socket == cpuSocket && Number(motherboard.pcie_x16) >= 1
      )
      return motherboardFilter
    }
  }

  async getCpuCoolerRecommendation(cpuIndex) {
    let cpuSpec = await this.cpuService.findOne(cpuIndex)
    let coolerAll = await this.CpuCoolerService.findAll()

    if (cpuSpec && coolerAll) {
      let cpuSocket = cpuSpec.cpu_socket
      let cpuTDP = Number(cpuSpec.tdp)
      let cpuBrand = cpuSpec.brand

      const coolerFilter = coolerAll.filter(cooler=> {
        if (cpuBrand == 'Intel') {
          let coolerSockets = cooler.intel_socket.split(', ')
          return coolerSockets.includes(cpuSocket) && Number(cooler.reccomended_tdp) > cpuTDP
        }
        else if (cpuBrand == 'AMD') {
          let coolerSockets = cooler.amd_socket.split(', ')
          return coolerSockets.includes(cpuSocket)&& Number(cooler.reccomended_tdp) > cpuTDP
        }
      }
      )
      return coolerFilter
    }
  }

  async getRamRecommendation(motherboardIndex,gameName) {
    let gameAll = await this.gameService.findAll()
    let gameSpecs = gameAll.find(gameProduct => gameProduct.game == gameName)
    let gameRam = 0

    if (gameSpecs) {
        gameRam = Number(gameSpecs.memory.split(' GB')[0])
    }

    let motherboardSpecs =  await this.motherboardService.findOne(motherboardIndex)

    // return(motherboardSpecs)
    let ramAll = await this.RamService.findAll()

    if (motherboardSpecs && gameRam >0) {
      let ramFilter = ramAll.filter(ram => {
        let ramSpec = ram.capacity.split('GB (')
        let ramSize = Number(ramSpec[0])
        let ramSlots= Number(ramSpec[1].split(' x')[0])
        //console.log(ramSize,ramSlots)
        return ramSize >= gameRam && ram.ramType == motherboardSpecs.ram_type && motherboardSpecs.ram_slots >= ramSlots 
        && motherboardSpecs.ram_max_speed >= ram.speed && motherboardSpecs.ram_max_size >= ramSize
    });
    return ramFilter
    }
  }

  async getSsdRecommendation(motherboardIndex,gameName)   {
    let motherboardSpecs = await this.motherboardService.findOne(motherboardIndex)
    let gameAll = await this.gameService.findAll()
    let gameSpecs = gameAll.find(gameProduct => gameProduct.game == gameName)
    let ssdAll = await this.SsdService.findAll()

    let gameStorage = 0

    if (gameSpecs) {
      gameStorage = Number(gameSpecs.storage.split(' GB')[0])
    }

    if (motherboardSpecs && gameStorage > 0) {
      let m2_support_list = motherboardSpecs.m2_support.split(' ')
      let ssdFilter = ssdAll.filter(ssd => {
        let ssdInterface = ssd.interface.trim().toLowerCase()

        if (ssdInterface == 'sata 6 /s') {
          return Number(ssd.capacity) > gameStorage && motherboardSpecs.sata_6gbs > 1
        } 
        else if (ssdInterface == 'pcie x4' || ssdInterface == 'pcie x2') {
         
          //console.log(m2_support_list,ssd.m2_format)
          if (m2_support_list.includes(String(ssd.m2_format))) {
            return Number(ssd.capacity) > gameStorage && motherboardSpecs.m2_connectors >= 1
          }
        }
      })
      return ssdFilter
    }
  }
  
  async getPsuRecommendation(cpuIndex,gpuIndex,motherboardIndex) {
    let cpuSpec = await this.cpuService.findOne(cpuIndex)
    let gpuSpec = await this.gpuService.findOne(gpuIndex)
    let motherboardSpec = await this.motherboardService.findOne(motherboardIndex)
    let psuAll = await this.PsuService.findAll() 

    let tdp = 0
    
    if(cpuSpec && gpuSpec) {
      let cpuTdp = Number(cpuSpec.tdp)
      let gpuTdp = Number(gpuSpec.tdp.split(' ')[0])
      tdp = (cpuTdp + gpuTdp + 210)*1.3

    }
    //console.log(tdp)

    if (motherboardSpec && tdp && psuAll) {
      let motherboardFormFactor = motherboardSpec.form_factor
      
      let psuList = psuAll.filter(psu=> {
        if (psu.type == 'ATX') {
          return (motherboardFormFactor == 'ATX' || motherboardFormFactor == 'Mirco ATX') && psu.max_power >= tdp
        }
        else if (psu.type == 'SFX') {
          return (motherboardFormFactor == 'Mini-ITX' || motherboardFormFactor == 'Mirco ATX') && psu.max_power >= tdp
        }
      })
      return psuList
    }
  }

  async getCaseRecommendation(gpuIndex,coolerIndex,motherboardIndex,psuIndex) {
    let gpuSpec = await this.gpuService.findOne(gpuIndex)
    let coolerSpec = await this.CpuCoolerService.findOne(coolerIndex)
    let motherboardSpec = await this.motherboardService.findOne(motherboardIndex)
    let psuSpec = await this.PsuService.findOne(psuIndex)
    let caseAll = await this.CpuCaseService.findAll()
    
    let gpuMaxDimension = 0
    let coolerMaxDimension = 0 
    let motherboardType = ''
    let psuMaxDimension = 0
    if (gpuSpec && coolerSpec && psuSpec && motherboardSpec) {
      gpuMaxDimension = Number(gpuSpec.dimension)

      let coolerDimensions = coolerSpec.dimension.split(' x ').map(Number)
      coolerMaxDimension = Math.max(...coolerDimensions)

      let psuDimensions = psuSpec.dimension.split('×').map(Number) // Lol this x is special wtf
      psuMaxDimension = Math.max(...psuDimensions)
      

      motherboardType = motherboardSpec.form_factor
    }

    
    let caseList = caseAll.filter(cases => {
        return cases.motherboard_support.includes(motherboardType) && Number(cases.gpu_size_clearance) > gpuMaxDimension 
       && Number(cases.cpu_cooler_clearance) > coolerMaxDimension && Number(cases.psu_size_clearance) > psuMaxDimension
    })
   return caseList 
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
