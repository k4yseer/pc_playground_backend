import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ThreeJsModel } from './entities/three-js-model.entity';
import { CreateThreeJsModelDto } from './dto/create-three-js-model.dto';
import { UpdateThreeJsModelDto } from './dto/update-three-js-model.dto';

@Injectable()
export class ThreeJsModelsService {

  constructor(
      @InjectRepository(ThreeJsModel)
      private cpuRepository: Repository<ThreeJsModel>, // Inject the repository for Cpu entity
    ) {}

  async create(createThreeJsModelDto: CreateThreeJsModelDto) {
    const threeJsModel = this.cpuRepository.create(createThreeJsModelDto); // Create a new ThreeJsModel instance
    return await this.cpuRepository.save(threeJsModel); // Save the new ThreeJsModel instance to the database
  }

  async findAll() {
    return await this.cpuRepository.find(); // Use TypeORM's find method to get all records
  }

  async findOne(id: number) {
    const threeJsModel = await this.cpuRepository.findOne({ where: { id: id } });
    if (!threeJsModel) {
      throw new NotFoundException(`ThreeJsModel with id ${id} not found`);
    }
    return threeJsModel; // Return the found ThreeJsModel
  }

  async update(id: number, updateThreeJsModelDto: UpdateThreeJsModelDto) {
    const threeJsModel = await this.cpuRepository.findOne({ where: { id: id } });
    if (!threeJsModel) {
      throw new NotFoundException(`ThreeJsModel with id ${id} not found`);
    }
    // Update the threeJsModel entity with the new values
    Object.assign(threeJsModel, updateThreeJsModelDto);
    return await this.cpuRepository.save(threeJsModel); // Save the updated entity back to the database
  }

  async remove(id: number) {
    const threeJsModel = await this.cpuRepository.findOne({ where: { id: id } });
    if (!threeJsModel) {
      throw new NotFoundException(`ThreeJsModel with id ${id} not found`);
    }
    return await this.cpuRepository.remove(threeJsModel); // Remove the entity from the database
  }

  async findByThreeJsModelFilepath(threeJsModelId: number): Promise<string | null> {
    const threeJsModel = await this.cpuRepository.findOne({ 
      where: { id: threeJsModelId },
      select: ['id', 'filepath'] // Select only the necessary fields
    });

    if (!threeJsModel) {
      throw new NotFoundException(`ThreeJsModel with id ${threeJsModelId} not found`);
    }

    return threeJsModel.filepath; // Return the file path of the ThreeJsModel
  }
}
