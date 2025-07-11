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
  async getGameCpuSpecs(gameId:number[]) {
    //const game = await this.gameService.findOne(gameId)
    if (gameId.length == 2 || gameId.length == 1 ) {
      let gameAll = await this.gameService.findAll();
      var intel_cpu_tier = 0
      var intel_cpu_code = 0
      var amd_cpu_tier = 0
      var amd_cpu_code = 0

      var game1_intel_cpu_tier = 0
      var game1_intel_cpu_code = 0
      var game1_amd_cpu_tier = 0
      var game1_amd_cpu_code = 0

      var game2_intel_cpu_tier = 0
      var game2_intel_cpu_code = 0
      var game2_amd_cpu_tier = 0
      var game2_amd_cpu_code = 0

      gameAll.forEach(games => {
        if (games.game_id == gameId[0]) {
          let game1_cpu_requirement = games.processor
          const regexPattern = new RegExp("(Intel|AMD)\\s+(Core(?: Ultra)?|Ryzen)\\s*(?:i)?\\s*([3579])\\s*-?\\s*([A-Za-z]*)(\\d{3,5})([A-Za-z+]*)?","gi")
          const cpuRequirements = Array.from(game1_cpu_requirement.matchAll(regexPattern))
        for (const requirement of cpuRequirements) {
          let brandRequirement1 = new Map<string,string>()
          brandRequirement1.set('brand',requirement[1])
          brandRequirement1.set('tier',requirement[3])
          brandRequirement1.set('code',requirement[5])

          //console.log(brandRequirement.get('brand'))
          if (brandRequirement1.get('brand') == 'Intel') {
            game1_intel_cpu_tier = Number(brandRequirement1.get('tier'))
            game1_intel_cpu_code = Number(brandRequirement1.get('code'))
            //console.log(intel_cpu_code)
          }
          else if (brandRequirement1.get('brand') == 'AMD') {
            game1_amd_cpu_tier = Number(brandRequirement1.get('tier'))
            game1_amd_cpu_code = Number(brandRequirement1.get('code'))
          // console.log(amd_cpu_code)
            
          }   
        }}});

        gameAll.forEach(games => {
        if (games.game_id == gameId[1]) {
          let game2_cpu_requirement = games.processor
          const regexPattern = new RegExp("(Intel|AMD)\\s+(Core(?: Ultra)?|Ryzen)\\s*(?:i)?\\s*([3579])\\s*-?\\s*([A-Za-z]*)(\\d{3,5})([A-Za-z+]*)?","gi")
          const cpuRequirements = Array.from(game2_cpu_requirement.matchAll(regexPattern))

          for (const requirement of cpuRequirements) {
          let brandRequirement2 = new Map<string,string>()
          brandRequirement2.set('brand',requirement[1])
          brandRequirement2.set('tier',requirement[3])
          brandRequirement2.set('code',requirement[5])

          //console.log(brandRequirement.get('brand'))
          if (brandRequirement2.get('brand') == 'Intel') {
            game2_intel_cpu_tier = Number(brandRequirement2.get('tier'))
            game2_intel_cpu_code = Number(brandRequirement2.get('code'))
            //console.log(intel_cpu_code)
          }
          else if (brandRequirement2.get('brand') == 'AMD') {
            game2_amd_cpu_tier = Number(brandRequirement2.get('tier'))
            game2_amd_cpu_code = Number(brandRequirement2.get('code'))
          // console.log(amd_cpu_code)
            
          }   
        }}});

        intel_cpu_tier = Math.max(game1_intel_cpu_tier,game2_intel_cpu_tier)
        intel_cpu_code = Math.max(game1_intel_cpu_code,game2_intel_cpu_code)
        amd_cpu_tier = Math.max(game1_amd_cpu_tier,game2_amd_cpu_tier)
        amd_cpu_code = Math.max(game1_amd_cpu_code,game2_amd_cpu_code)

        return (this.getCpuRecomendation(intel_cpu_tier,intel_cpu_code,amd_cpu_tier,amd_cpu_code)) 
    }
    else {
      return "Error, Please select 1 or 2 Games"
    }
  }

    ;

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

  async getGameGpuSpecs(gameId:number[]) {
    if (gameId.length == 1 || gameId.length == 2) {
    var rx_type = 'RX'
    var rx_chip = 0
    var rtx_type = 'RTX'
    var rtx_chip = 0

    var game1_rx_type = ''
    var game1_rx_chip = 0
    var game1_rtx_type = ''
    var game1_rtx_chip = 0

    var game2_rx_type = ''
    var game2_rx_chip = 0
    var game2_rtx_type = ''
    var game2_rtx_chip = 0

    let gameAll = await this.gameService.findAll();
    // const gameSpecs = gameAll.find(gameProduct => gameProduct.game == gameName)
    gameAll.forEach(game=>{
      if (game.game_id == gameId[0]) {
        let game1Specs = game.graphics
        const regexPattern = new RegExp('\\b(RTX|GTX|RX)\\s*(\\d{3,4})\\b','gi');
        const gpuRequirements = Array.from(game1Specs.matchAll(regexPattern))
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
            game1_rtx_type = String(typeRequirement.get("type"))
            game1_rtx_chip = Number(typeRequirement.get("chip"))
          }
          else if (typeRequirement.get('type') == 'RX') {
            game1_rx_type = String(typeRequirement.get('type'))
            game1_rx_chip = Number(typeRequirement.get('chip'))
          }
        }
      }})

    gameAll.forEach(game=>{
      if (game.game_id == gameId[1]) {
        console.log('hi')
      let game2Specs = game.graphics
      const regexPattern = new RegExp('\\b(RTX|GTX|RX)\\s*(\\d{3,4})\\b','gi');
      const gpuRequirements = Array.from(game2Specs.matchAll(regexPattern))
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
          game2_rtx_type = String(typeRequirement.get("type"))
          game2_rtx_chip = Number(typeRequirement.get("chip"))
        }
        else if (typeRequirement.get('type') == 'RX') {
          game2_rx_type = String(typeRequirement.get('type'))
          game2_rx_chip = Number(typeRequirement.get('chip'))
        }
      }
    }})

      rtx_chip = Math.max(game1_rtx_chip,game2_rtx_chip)
      rx_chip = Math.max(game1_rx_chip, game2_rx_chip)
      //console.log(rx_type,rx_chip,rtx_type,rtx_chip)
      return this.getGpuRecommendation(rx_type, rx_chip, rtx_type, rtx_chip)
    }
    else if (gameId.length == 0 || gameId.length > 2) {
      return "Please select 1 or 2 games"
    }
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
    if (cpuIndex == undefined || gpuIndex == undefined) {
      return "Error, Contact Customer Service"
    }
    else {
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
  }}

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

  async getRamRecommendation(motherboardIndex:number,gameId) {
    if (motherboardIndex == undefined || gameId.length == 0 || gameId.length > 2) {
      return "Error, Contact Customer Service"
    }
    else {
    let gameAll = await this.gameService.findAll()
    let gameRam = 0

    gameId.forEach(id => {
       gameAll.forEach(game => {
        if (id == game.game_id) {
          let gameTempRam = Number(game.memory.split(' GB')[0])
          if (gameTempRam > gameRam) {
            gameRam = gameTempRam
            //console.log(gameRam)
          }
        }
       }) 
    });
    //console.log(gameRam)
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
  }}

  async getSsdRecommendation(motherboardIndex,gameId)   {
    let motherboardSpecs = await this.motherboardService.findOne(motherboardIndex)
    let gameAll = await this.gameService.findAll()
    //let gameSpecs = gameAll.find(gameProduct => gameProduct.game == gameName)
    let ssdAll = await this.SsdService.findAll()

    let gameStorage = 0

    gameId.forEach(id => {
       gameAll.forEach(game => {
        if (id == game.game_id) {
          let gameTempStorage = Number(game.storage.split(' GB')[0])
          if (gameTempStorage > gameStorage) {
            gameStorage = gameTempStorage
            //console.log(gameStorage)
          }
        }
       }) 
    });

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
async getPresetCpu() {
  //format: cpu, gpu, motherboard, cpu_cooler, ssd, ram, psu, case
    const low_tier = [
      await this.cpuService.findOne(140),
      await this.gpuService.findOne(207),
      await this.motherboardService.findOne(167),
      await this.CpuCoolerService.findOne(10),
      await this.SsdService.findOne(337),
      await this.RamService.findOne(637),
      await this.PsuService.findOne(53),
      await this.CpuCaseService.findOne(39)   
    ]
    const high_tier = [
      await this.cpuService.findOne(199),
      await this.gpuService.findOne(6),
      await this.motherboardService.findOne(1),
      await this.CpuCoolerService.findOne(26),
      await this.SsdService.findOne(8),
      await this.RamService.findOne(2969),
      await this.PsuService.findOne(1),
      await this.CpuCaseService.findOne(1)
    ]

    return [low_tier,high_tier]
}
    
   

    //return high_level
 async getGameAllspecs(gameId) {
    let gameAll = await this.gameService.findAll()
    
    var gameIntelProcessorTier = 0
    var gameAmdProcessorTier = 0
    var gameIntelProcessorCode = 0
    var gameAmdProcessorCode = 0
    var gameMemory = 0
    var gameIntelGraphics = 0
    var gameAmdGraphics = 0
    var gameStorage = 0

    gameId.forEach(id => {
          gameAll.forEach(game => {
            if (id == game.game_id) {
              gameStorage = Number(game.storage.split(' GB')[0])

              let ramSpec = game.memory.split(' ')  
              gameMemory = Number(ramSpec[0])
              
              const regexGraphicsPattern = new RegExp('\\b(RTX|GTX|RX)\\s*(\\d{3,4})\\b','gi');
              const gpuRequirements = Array.from(game.graphics.matchAll(regexGraphicsPattern))
              //console.log(gpuRequirements)
              let gamebrand = gpuRequirements[1]
              for (const requirement of gpuRequirements) {
                let typeRequirement = new Map<string,string>()
                typeRequirement.set('chip', requirement[2])
                
                if (requirement[1] == 'GTX' || requirement[1] == 'RTX') {
                  typeRequirement.set('type', 'RTX')
                }
                else {
                  typeRequirement.set('type', requirement[1])
                }
                
                if (typeRequirement.get('type') == 'RTX') {
                  gameIntelGraphics = Number(typeRequirement.get("chip"))
                }
                else if (typeRequirement.get('type') == 'RX') {
                  gameAmdGraphics = Number(typeRequirement.get('chip'))
                }
              }
            const regexPattern = new RegExp("(Intel|AMD)\\s+(Core(?: Ultra)?|Ryzen)\\s*(?:i)?\\s*([3579])\\s*-?\\s*([A-Za-z]*)(\\d{3,5})([A-Za-z+]*)?","gi")
          const cpuRequirements = Array.from(game.processor.matchAll(regexPattern))
        for (const requirement of cpuRequirements) {
          let brandRequirement = new Map<string,string>()
          brandRequirement.set('brand',requirement[1])
          brandRequirement.set('tier',requirement[3])
          brandRequirement.set('code',requirement[5])

          //console.log(brandRequirement.get('brand'))
          if (brandRequirement.get('brand') == 'Intel') {
            gameIntelProcessorTier = Number(brandRequirement.get('tier'))
            gameIntelProcessorCode = Number(brandRequirement.get('code'))
            //console.log(gameIntelProcessorCode)
          }
          else if (brandRequirement.get('brand') == 'AMD') {
            gameAmdProcessorTier = Number(brandRequirement.get('tier'))
            gameAmdProcessorCode = Number(brandRequirement.get('code'))
           //console.log(gameAmdProcessorTier)
            
          }   
        }
      }})}
    )
    //console.log(gameAmdGraphics,gameAmdProcessorCode,gameAmdProcessorTier,gameIntelGraphics,gameIntelProcessorCode,gameIntelProcessorTier,gameMemory,gameStorage)
    return [gameIntelProcessorTier,gameIntelProcessorCode,gameAmdProcessorTier,gameAmdProcessorCode,gameIntelGraphics,gameAmdGraphics,gameMemory,gameStorage]
  }
    //Comparing Low-tier to gameRequirement
  async getBestPreset(gameId) {
    const presets = await this.getPresetCpu() //IMPT: Preset is lowest to highest
    const gameSpecs = await this.getGameAllspecs(gameId)
    
    const [gameIntelProcessorTier,gameIntelProcessorCode,gameAmdProcessorTier,gameAmdProcessorCode,gameIntelGraphics,gameAmdGraphics,gameMemory,gameStorage] = gameSpecs
    //Preset[0] == Cpu Object
    for (let preset of presets) {
    // Destructure the tier for clarity (order: cpu, gpu, motherboard, cooler, ssd, ram, psu, case)
      const [presetCpu, presetGpu, presetMotherboard, presetCooler, presetSsd, presetRam, presetPsu, presetCase] = preset

      if (presetCpu && 'brand' in presetCpu) { // ThIS IS FOR CPU OBJECT
        //console.log(presetCpu.brand)
        if (presetCpu.brand == 'Intel') {
          if (Number(presetCpu.cpu_tier) < gameIntelProcessorTier || Number(presetCpu.cpu_code)< gameIntelProcessorCode) {
            continue
          }
        }
        else if (presetCpu.brand == 'AMD') {
          if (Number(presetCpu.cpu_tier) < gameAmdProcessorTier || Number(presetCpu.cpu_code) < gameAmdProcessorCode) {
            continue
          }
        }
        else {
          return 'Error code 1'
        }
       }

      if (presetGpu && 'gpu_code' in presetGpu ) { //THIS IS FOR GPU OBJECT
        let presetGpuBrand = presetGpu.gpu_code.split(' ')[0]
        let presetGpuCode = presetGpu.gpu_code.split(' ')[1] 
        //console.log(presetGpuCode)
        
        if (presetGpuBrand == 'RTX' || presetGpuBrand == 'GTX') {
          if (Number(presetGpuCode) < gameIntelGraphics) {
            continue
          }
        }
        else if (presetGpuBrand == 'RX') {
          if (Number(presetGpuCode) < gameAmdGraphics) {
            continue
          }
        }
        else {
          return 'Error code 2'
        }
      }

      if (presetRam && 'capacity' in presetRam && "ram_id" in presetRam) { //THIS IS FOR RAM
        let presetRamCapacity = Number(presetRam.capacity.split('GB')[0])
        if (presetRamCapacity < gameMemory) {
          continue
        }
      }

      if (presetSsd && 'capacity' in presetSsd && 'ssd_id' in presetSsd) { //THIS IS FOR SSD
        if (Number(presetSsd.capacity) < gameStorage) {
          continue
        }
      }
      return preset
    }
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}
// {
//   "cpu": {},
//   "gpu": {}
// }
  

  // check if everything works together