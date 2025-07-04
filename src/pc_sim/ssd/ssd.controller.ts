import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SsdService } from './ssd.service';
import { CreateSsdDto } from './dto/create-ssd.dto';
import { UpdateSsdDto } from './dto/update-ssd.dto';

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
}
