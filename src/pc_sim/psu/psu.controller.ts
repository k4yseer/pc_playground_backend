import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PsuService } from './psu.service';
import { CreatePsuDto } from './dto/create-psu.dto';
import { UpdatePsuDto } from './dto/update-psu.dto';

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
}
