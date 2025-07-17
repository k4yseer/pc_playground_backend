import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { RamService } from './ram.service';
import { CreateRamDto } from './dto/create-ram.dto';
import { UpdateRamDto } from './dto/update-ram.dto';
import { paginationDto, PaginatedResult } from '../paginationDto/pagination.dto'; // Import pagination DTO and result interface
import { Ram } from './entities/ram.entity';

@Controller('ram')
export class RamController {
  constructor(private readonly ramService: RamService) {}

  @Post()
  create(@Body() createRamDto: CreateRamDto) {
    return this.ramService.create(createRamDto);
  }

  @Get()
  findAll() {
    return this.ramService.findAll();
  }
  @Get('paginated')
  async findAllPaginated(
    @Query() paginationDto: paginationDto,
  ): Promise<PaginatedResult<Ram>> {
    return this.ramService.findAllPaginated(paginationDto);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ramService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRamDto: UpdateRamDto) {
    return this.ramService.update(+id, updateRamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ramService.remove(+id);
  }

  @Get('model/:id')
  async findByRamFilepath(@Param('id', ParseIntPipe) id: number) {
    const url = await this.ramService.findByRamFilepath(+id);
    if (url === null) {
      return { url: null };
    }
    return { url };
  }
}
