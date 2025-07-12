import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ThreeJsModelsService } from './three-js-models.service';
import { CreateThreeJsModelDto } from './dto/create-three-js-model.dto';
import { UpdateThreeJsModelDto } from './dto/update-three-js-model.dto';

@Controller('threejsModel')
export class ThreeJsModelsController {
  constructor(private readonly threeJsModelsService: ThreeJsModelsService) {}

  @Post()
  create(@Body() createThreeJsModelDto: CreateThreeJsModelDto) {
    return this.threeJsModelsService.create(createThreeJsModelDto);
  }

  @Get()
  findAll() {
    return this.threeJsModelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.threeJsModelsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateThreeJsModelDto: UpdateThreeJsModelDto) {
    return this.threeJsModelsService.update(+id, updateThreeJsModelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.threeJsModelsService.remove(+id);
  }

  @Get('model/:id')
  async getGltfModelDirectUrl(@Param('id', ParseIntPipe) id: number) {
    const url = await this.threeJsModelsService.findByThreeJsModelFilepath(id);
    if (url === null) {
      return { url: null };
    }
    return { url };
  }
}
