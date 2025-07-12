import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gpu } from './entities/gpu.entity';
import { CreateGpuDto } from './dto/create-gpu.dto';
import { UpdateGpuDto } from './dto/update-gpu.dto';

@Injectable()
export class GpuService {
  constructor(
    @InjectRepository(Gpu)
    private gpuRepository: Repository<Gpu>, // Inject the repository for Gpu entity
  ) {} 
  async create(createGpuDto: CreateGpuDto) {
    const gpu = this.gpuRepository.create(createGpuDto); // Create a new Gpu instance
    return await this.gpuRepository.save(gpu); // Save the new Gpu instance to the database
  }

  async findAll() {
    return await this.gpuRepository.find(); // Use TypeORM's find method to get all records
  }

  async findOne(id: number): Promise<Gpu | null> { // Return type can be Gpu or undefined if not found
    return this.gpuRepository.findOne({ where: { gpu_id: id } }); // Return a specific Gpu by its ID
  }

  async update(id: number, updateGpuDto: UpdateGpuDto) {
    const gpu = await this.gpuRepository.findOne({ where: { gpu_id: id } });
    if (!gpu) {
      throw new Error(`Gpu with id ${id} not found`);
    }
    // Update the gpu entity with the new values
    Object.assign(gpu, updateGpuDto);
    return await this.gpuRepository.save(gpu); // Save the updated entity back to the database
  }

  async remove(id: number) {
    const gpu = await this.gpuRepository.findOne({ where: { gpu_id: id } });
    if (!gpu) {
      throw new Error(`Gpu with id ${id} not found`);
    }
    return await this.gpuRepository.remove(gpu); // Remove the entity from the database
  }

  async findByGpuFilepath(gpuId: number): Promise<string | null> {
    const gpu = await this.gpuRepository.findOne({ 
      where: { gpu_id: gpuId },
      select: ['gpu_id', 'gpuFilepath'] // Select only the necessary fields
     });

    if (!gpu) {
      throw new Error(`Gpu with id ${gpuId} not found`);
    }
    return gpu.gpuFilepath; // Return the file path of the GPU
  }
}
