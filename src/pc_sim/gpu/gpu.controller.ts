import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { GpuService } from './gpu.service';
import { CreateGpuDto } from './dto/create-gpu.dto';
import { UpdateGpuDto } from './dto/update-gpu.dto';
import { paginationDto, PaginatedResult } from '../paginationDto/pagination.dto';
import { Gpu } from './entities/gpu.entity';

@Controller('gpu')
export class GpuController {
  constructor(private readonly gpuService: GpuService) {}

  @Post()
  create(@Body() createGpuDto: CreateGpuDto) {
    return this.gpuService.create(createGpuDto);
  }
  @Get('paginated')
  async findAllPaginated(
    @Query() paginationDto: paginationDto,
  ): Promise<PaginatedResult<Gpu>> {
    return this.gpuService.findAllPaginated(paginationDto);
  }
  
  @Get()
  findAll() {
    return this.gpuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gpuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGpuDto: UpdateGpuDto) {
    return this.gpuService.update(+id, updateGpuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gpuService.remove(+id);
  }

  @Get('model/:id')
  async findByGpuFilepath(@Param('id', ParseIntPipe) id: number) {
    const url = await this.gpuService.findByGpuFilepath(+id);
    if (url === null) {
      return { url: null };
    }
    return { url };
  }
}
