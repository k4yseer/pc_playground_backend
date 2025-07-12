import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { CpuService } from './cpu.service';
import { CreateCpuDto } from './dto/create-cpu.dto';
import { UpdateCpuDto } from './dto/update-cpu.dto';
import { get } from 'http';

@Controller('cpu')
export class CpuController {
  constructor(private readonly cpuService: CpuService) {}

  @Post()
  create(@Body() createCpuDto: CreateCpuDto) {
    return this.cpuService.create(createCpuDto);
  }

  @Get()
  async findAll() {
    return await this.cpuService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.cpuService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCpuDto: UpdateCpuDto) {
    return this.cpuService.update(+id, updateCpuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cpuService.remove(+id);
  }

  @Get('model/:id')
  async getGltfModelDirectUrl(@Param('id', ParseIntPipe) id: number) {
      const url = await this.cpuService.findByCpuFilepath(id);
      if (url === null) {
        return { url: null};
    }
    return { url };
  }
}

