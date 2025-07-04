import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CpuCase } from './entities/cpu_case.entity';
import { CreateCpuCaseDto } from './dto/create-cpu_case.dto';
import { UpdateCpuCaseDto } from './dto/update-cpu_case.dto';


@Injectable()
export class CpuCaseService {
  constructor(
    @InjectRepository(CpuCase)
    private cpuCaseRepository: Repository<CpuCase>, // Inject the repository for CpuCase entity
  ) {}  

  async create(createCpuCaseDto: CreateCpuCaseDto) {
    const cpuCase = this.cpuCaseRepository.create(createCpuCaseDto); // Create a new CpuCase instance
    return await this.cpuCaseRepository.save(cpuCase); // Save the new CpuCase instance to
  }

  async findAll() {
    return await this.cpuCaseRepository.find(); // Use TypeORM's find method to get all records
  }

  async findOne(id: number): Promise<CpuCase | null> { // Return type can be CpuCase or undefined if not found
    return this.cpuCaseRepository.findOne({ where: { cpu_case_id: id } });
  }

  async update(id: number, updateCpuCaseDto: UpdateCpuCaseDto) {
    console.log(id);
    const cpuCase = await this.cpuCaseRepository.findOne({ where: { cpu_case_id: id } });
    if (!cpuCase) {
      throw new Error(`CpuCase with id ${id} not found`);
    }
    // Update the cpuCase entity with the new values
    Object.assign(cpuCase, updateCpuCaseDto);
    return await this.cpuCaseRepository.save(cpuCase); // Save the updated entity back to the database
  }

  async remove(id: number) {
    const cpuCase = await this.cpuCaseRepository.findOne({ where: { cpu_case_id: id } });
    if (!cpuCase) {
      throw new Error(`CpuCase with id ${id} not found`);
    }
    return await this.cpuCaseRepository.remove(cpuCase); // Remove the entity from the database
  }
}
