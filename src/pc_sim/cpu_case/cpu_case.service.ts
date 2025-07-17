import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CpuCase } from './entities/cpu_case.entity';
import { CreateCpuCaseDto } from './dto/create-cpu_case.dto';
import { UpdateCpuCaseDto } from './dto/update-cpu_case.dto';
import { paginationDto, PaginatedResult } from '../paginationDto/pagination.dto'; // Import pagination DTO and result interface



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

  async findByCpuCaseFilepath(cpuCaseId: number): Promise<string | null> {
    const cpuCase = await this.cpuCaseRepository.findOne({ 
      where: { cpu_case_id: cpuCaseId },
      select: ['cpu_case_id', 'cpuCaseFilepath'] // Select only the necessary fields
    });

    if (!cpuCase) {
      throw new Error(`CpuCase with id ${cpuCaseId} not found`);
    }

    return cpuCase.cpuCaseFilepath; // Return the file path or null if not set
  }

  async findAllPaginated(
    paginationDto: paginationDto
  ): Promise<PaginatedResult<CpuCase>> {
    const page = parseInt(String(paginationDto.page || '1'), 10);
    const limit = parseInt(String(paginationDto.limit || '25'), 10);
    const search = paginationDto.search;
    const offset = paginationDto.offset ? parseInt(String(paginationDto.offset), 10) : (page - 1) * limit;

    let query = this.cpuCaseRepository
      .createQueryBuilder("cpu_case")
      .orderBy("cpu_case.cpu_case_id", "ASC")
      .where("cpu_case.case_name ilike :search", {search: search ?`%${search}%` : "%" })
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
