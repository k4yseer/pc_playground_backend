import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { MotherboardService } from './motherboard.service';
import { CreateMotherboardDto } from './dto/create-motherboard.dto';
import { UpdateMotherboardDto } from './dto/update-motherboard.dto';
import { paginationDto, PaginatedResult } from '../paginationDto/pagination.dto'; // Import pagination DTO and result interface
import { Motherboard } from './entities/motherboard.entity';

@Controller('motherboard')
export class MotherboardController {
  constructor(private readonly motherboardService: MotherboardService) {}

  @Post()
  create(@Body() createMotherboardDto: CreateMotherboardDto) {
    return this.motherboardService.create(createMotherboardDto);
  }

  @Get()
  findAll() {
    return this.motherboardService.findAll();
  }

  @Get('paginated')
  async findAllPaginated(
    @Query() paginationDto: paginationDto,
  ): Promise<PaginatedResult<Motherboard>> {
    return this.motherboardService.findAllPaginated(paginationDto);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.motherboardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMotherboardDto: UpdateMotherboardDto) {
    return this.motherboardService.update(+id, updateMotherboardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.motherboardService.remove(+id);
  }

  @Get('model/:id')
  async findByMotherboardFilepath(@Param('id', ParseIntPipe) id: number) {
    const url = await this.motherboardService.findByMotherboardFilepath(id);
    if (url === null) {
      return { url: null };
    }
    return { url };
  }
}
