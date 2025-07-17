import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { CpuCoolerService } from './cpu_cooler.service';
import { CreateCpuCoolerDto } from './dto/create-cpu_cooler.dto';
import { UpdateCpuCoolerDto } from './dto/update-cpu_cooler.dto';
import { paginationDto, PaginatedResult } from '../paginationDto/pagination.dto';
import { CpuCooler } from './entities/cpu_cooler.entity';

@Controller('cpuCooler')
export class CpuCoolerController {
  constructor(private readonly cpuCoolerService: CpuCoolerService) {}

  @Post()
  create(@Body() createCpuCoolerDto: CreateCpuCoolerDto) {
    return this.cpuCoolerService.create(createCpuCoolerDto);
  }

  @Get('paginated')
  async findAllPaginated(
    @Query() paginationDto: paginationDto,
  ): Promise<PaginatedResult<CpuCooler>> {
    return this.cpuCoolerService.findAllPaginated(paginationDto);
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
}
