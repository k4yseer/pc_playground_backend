import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CpuCaseService } from './cpu_case.service';
import { CreateCpuCaseDto } from './dto/create-cpu_case.dto';
import { UpdateCpuCaseDto } from './dto/update-cpu_case.dto';

@Controller('cpuCase')
export class CpuCaseController {
  constructor(private readonly cpuCaseService: CpuCaseService) {}

  @Post()
  create(@Body() createCpuCaseDto: CreateCpuCaseDto) {
    return this.cpuCaseService.create(createCpuCaseDto);
  }

  @Get()
  findAll() {
    return this.cpuCaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cpuCaseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCpuCaseDto: UpdateCpuCaseDto) {
    return this.cpuCaseService.update(+id, updateCpuCaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cpuCaseService.remove(+id);
  }
}
