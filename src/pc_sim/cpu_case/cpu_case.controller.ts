import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { CpuCaseService } from './cpu_case.service';
import { CreateCpuCaseDto } from './dto/create-cpu_case.dto';
import { UpdateCpuCaseDto } from './dto/update-cpu_case.dto';
import { paginationDto, PaginatedResult } from '../paginationDto/pagination.dto';
import { CpuCase } from './entities/cpu_case.entity';

@Controller('cpuCase')
export class CpuCaseController {
  constructor(private readonly cpuCaseService: CpuCaseService) {}

  @Post()
  create(@Body() createCpuCaseDto: CreateCpuCaseDto) {
    return this.cpuCaseService.create(createCpuCaseDto);
  }

  @Get('paginated')
  async findAllPaginated(
    @Query() paginationDto: paginationDto,
  ): Promise<PaginatedResult<CpuCase>> {
    return this.cpuCaseService.findAllPaginated(paginationDto);

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

  @Get('model/:id')
  async findByCpuCaseFilepath(@Param('id', ParseIntPipe) id: number) {
    const url = await this.cpuCaseService.findByCpuCaseFilepath(id);
    if (url === null) {
      return { url: null };
    }
    return { url };
  }
}
