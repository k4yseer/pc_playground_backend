import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { SsdService } from './ssd.service';
import { CreateSsdDto } from './dto/create-ssd.dto';
import { UpdateSsdDto } from './dto/update-ssd.dto';
import { paginationDto, PaginatedResult } from '../paginationDto/pagination.dto'; // Import pagination DTO and result interface
import { Ssd } from './entities/ssd.entity';

@Controller('ssd')
export class SsdController {
  constructor(private readonly ssdService: SsdService) {}

  @Post()
  create(@Body() createSsdDto: CreateSsdDto) {
    return this.ssdService.create(createSsdDto);
  }

  @Get()
  findAll() {
    return this.ssdService.findAll();
  }

  @Get('paginated')
  async findAllPaginated(
    @Query() paginationDto: paginationDto,
  ): Promise<PaginatedResult<Ssd>> {
    return this.ssdService.findAllPaginated(paginationDto);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ssdService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSsdDto: UpdateSsdDto) {
    return this.ssdService.update(+id, updateSsdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ssdService.remove(+id);
  }

  @Get('model/:id')
  async findBySsdFilepath(@Param('id', ParseIntPipe) id: number) {
    const url = await this.ssdService.findBySsdFilepath(+id);
    if (url === null) {
      return { url: null };
    }
    return { url };
  }
}
