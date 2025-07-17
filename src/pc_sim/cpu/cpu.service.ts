import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cpu } from './entities/cpu.entity';
import { CreateCpuDto } from './dto/create-cpu.dto';
import { UpdateCpuDto } from './dto/update-cpu.dto';
import { paginationDto, PaginatedResult } from '../paginationDto/pagination.dto'; // Import pagination DTO and result interface
import { CpuCase } from '../cpu_case/entities/cpu_case.entity'; // Import CpuCase entity

@Injectable()
export class CpuService {
  constructor(
    @InjectRepository(Cpu)
    private cpuRepository: Repository<Cpu>, // Inject the repository for Cpu entity
  ) {}
  
  async create(createCpuDto: CreateCpuDto) {
    const cpu = this.cpuRepository.create(createCpuDto); // Create a new Cpu instance
    return await this.cpuRepository.save(cpu); // Save the new Cpu instance to the database
  }

  async findAll() {
    return await this.cpuRepository.find(); // Use TypeORM's find method to get all records
  }

 async findOne(id: number): Promise<Cpu | null> { // Return type can be Cpu or undefined if not found
    // Use TypeORM's findOne method to find by primary key 'index'
    // { where: { index: id } } is the explicit way, but for primary keys
    // TypeORM often allows findOne(id) directly if 'id' refers to the primary key.
    // However, findOne({ where: ... }) is more robust for any column.
    return this.cpuRepository.findOne({ where: { cpu_id: id } });
  }

  async update(id: number, updateCpuDto: UpdateCpuDto) {
    console.log(id);
    
    const cpu = await this.cpuRepository.findOne({ where: { cpu_id: id } });
    if (!cpu) {
      throw new Error(`Cpu with id ${id} not found`);
    }
    // Update the cpu entity with the new values
    Object.assign(cpu, updateCpuDto);
    return await this.cpuRepository.save(cpu); // Save the updated entity back to the database
  }

  async remove(id: number) {
    const cpu = await this.cpuRepository.findOne({ where: { cpu_id: id } });
    if (!cpu) {
      throw new Error(`Cpu with id ${id} not found`);
    }
    return await this.cpuRepository.remove(cpu); // Remove the entity from the database
  }

  async findByCpuFilepath(cpuId: number): Promise<string | null> {
    const cpu = await this.cpuRepository.findOne({ 
      where: { cpu_id: cpuId },
      select: ['cpu_id', 'cpuFilepath'] // Select only the necessary fields
     });

    if (!cpu) {
      throw new Error(`Cpu with id ${cpuId} not found`);
    }
    
    if (!cpu.cpuFilepath) {
      return null; // Return null if cpuFilepath is not set
    }
    
    // Return the cpuFilepath if it exists
    return cpu.cpuFilepath;
  }

  async findAllPaginated(
      paginationDto: paginationDto
    ): Promise<PaginatedResult<Cpu>> {
      const page = parseInt(String(paginationDto.page || '1'), 10);
      const limit = parseInt(String(paginationDto.limit || '25'), 10);
      const search = paginationDto.search;
      const offset = paginationDto.offset ? parseInt(String(paginationDto.offset), 10) : (page - 1) * limit;
  
      let query = this.cpuRepository
        .createQueryBuilder("cpu")
        .orderBy("cpu.cpu_id", "ASC")
        .where("cpu.cpu_name ilike :search", {search: search ?`%${search}%` : "%" })
        .limit(limit)
        .offset(offset);
  
      const [data, total] = await query.getManyAndCount();
  
      const totalPages = Math.ceil(total / limit);
  
      return {
        data,
        meta: {
          totalItems: total,
          itemCount: data.length,
          itemsPerPage: limit,
          currentPage: page,
          totalPages,
        },
      };
    }
  
}