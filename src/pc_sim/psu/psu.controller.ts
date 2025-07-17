import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { PsuService } from './psu.service';
import { CreatePsuDto } from './dto/create-psu.dto';
import { UpdatePsuDto } from './dto/update-psu.dto';
import { paginationDto, PaginatedResult } from '../paginationDto/pagination.dto'; // Import pagination DTO and result interface
import { Psu } from './entities/psu.entity';

@Controller('psu')
export class PsuController {
  constructor(private readonly psuService: PsuService) {}

  @Post()
  create(@Body() createPsuDto: CreatePsuDto) {
    return this.psuService.create(createPsuDto);
  }

  @Get()
  findAll() {
    return this.psuService.findAll();
  }

  @Get('paginated')
  async findAllPaginated(
    @Query() paginationDto: paginationDto,
  ): Promise<PaginatedResult<Psu>> {
    return this.psuService.findAllPaginated(paginationDto);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.psuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePsuDto: UpdatePsuDto) {
    return this.psuService.update(+id, updatePsuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.psuService.remove(+id);
  }

  @Get('model/:id')
  async findByPsuFilepath(@Param('id', ParseIntPipe) id: number) {
    const url = await this.psuService.findByPsuFilepath(+id);
    if (url === null) {
      return { url: null };
    }
    return { url };
  }
}
