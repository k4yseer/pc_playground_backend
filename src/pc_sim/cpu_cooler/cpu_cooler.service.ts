import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CpuCooler } from './entities/cpu_cooler.entity';
import { CreateCpuCoolerDto } from './dto/create-cpu_cooler.dto';
import { UpdateCpuCoolerDto } from './dto/update-cpu_cooler.dto';

@Injectable()
export class CpuCoolerService {
  constructor(
    @InjectRepository(CpuCooler)
    private cpuCoolerRepository: Repository<CpuCooler>, // Inject the repository for CpuCooler entity
  ) {}


  async create(createCpuCoolerDto: CreateCpuCoolerDto) {
    const cpuCooler = this.cpuCoolerRepository.create(createCpuCoolerDto); // Create a new CpuCooler instance
    return await this.cpuCoolerRepository.save(cpuCooler); // Save the new CpuCool
  }

  async findAll() {
    return await this.cpuCoolerRepository.find(); // Use TypeORM's find method to get all records
  }

  async findOne(id: number): Promise<CpuCooler | null> { // Return type can be CpuCooler or undefined if not found
    return this.cpuCoolerRepository.findOne({ where: { cpu_cooler_id: id } });
  }

  async update(id: number, updateCpuCoolerDto: UpdateCpuCoolerDto) {
    console.log(id);
    const cpuCooler = await this.cpuCoolerRepository.findOne({ where: { cpu_cooler_id: id } });
    if (!cpuCooler) {
      throw new Error(`CpuCooler with id ${id} not found`);
    }
    // Update the cpuCooler entity with the new values
    Object.assign(cpuCooler, updateCpuCoolerDto);
    return await this.cpuCoolerRepository.save(cpuCooler); // Save the updated entity back to the database
  }

  async remove(id: number) {
    const cpuCooler = await this.cpuCoolerRepository.findOne({ where: { cpu_cooler_id: id } });
    if (!cpuCooler) {
      throw new Error(`CpuCooler with id ${id} not found`);
    }
    return await this.cpuCoolerRepository.remove(cpuCooler); // Remove the entity from the database
  }

}
