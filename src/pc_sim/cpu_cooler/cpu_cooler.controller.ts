import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CpuCoolerService } from './cpu_cooler.service';
import { CreateCpuCoolerDto } from './dto/create-cpu_cooler.dto';
import { UpdateCpuCoolerDto } from './dto/update-cpu_cooler.dto';

@Controller('cpuCooler')
export class CpuCoolerController {
  constructor(private readonly cpuCoolerService: CpuCoolerService) {}

  @Post()
  create(@Body() createCpuCoolerDto: CreateCpuCoolerDto) {
    return this.cpuCoolerService.create(createCpuCoolerDto);
  }

  @Get()
  findAll() {
    return this.cpuCoolerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cpuCoolerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCpuCoolerDto: UpdateCpuCoolerDto) {
    return this.cpuCoolerService.update(+id, updateCpuCoolerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cpuCoolerService.remove(+id);
  }

  @Get('model/:id')
  async getGltfModelDirectUrl(@Param('id', ParseIntPipe) id: number) {
    const url = await this.cpuCoolerService.findByCpuCoolerFilepath(id);
    if (url === null) {
      return { url: null };
    }
    return { url };
  }
}
