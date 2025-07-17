import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CpuCooler } from './entities/cpu_cooler.entity';
import { CreateCpuCoolerDto } from './dto/create-cpu_cooler.dto';
import { UpdateCpuCoolerDto } from './dto/update-cpu_cooler.dto';
import { paginationDto, PaginatedResult } from '../paginationDto/pagination.dto';
import { stringify } from 'querystring';

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

  async findAllPaginated(
    paginationDto: paginationDto,
  ): Promise<PaginatedResult<CpuCooler>> {
    const page = parseInt(String(paginationDto.page || '1'), 10); // Default to page 1 if not provided
    const limit = parseInt(String(paginationDto.limit || '25'), 10); // Default to limit of 10 if not provided
    const search = paginationDto.search;
    const offset = paginationDto.offset ? parseInt(String(paginationDto.offset), 10) : (page - 1) * limit;

    let query = this.cpuCoolerRepository
      .createQueryBuilder("cpu_cooler")
      .orderBy("cpu_cooler.cpu_cooler_id", "ASC")
      .where("cpu_cooler.cooler_name ilike :search", {search: search ?`%${search}%` : "%" })
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
