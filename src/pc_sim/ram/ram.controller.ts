import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { RamService } from './ram.service';
import { CreateRamDto } from './dto/create-ram.dto';
import { UpdateRamDto } from './dto/update-ram.dto';

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
