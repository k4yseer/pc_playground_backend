import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Psu } from './entities/psu.entity';
import { CreatePsuDto } from './dto/create-psu.dto';
import { UpdatePsuDto } from './dto/update-psu.dto';
import { paginationDto, PaginatedResult } from '../paginationDto/pagination.dto'; // Import pagination DTO and result interface

@Injectable()
export class PsuService {
  constructor(
    @InjectRepository(Psu)
    private psuRepository: Repository<Psu>, // Inject the repository for Psu entity
  ) {}
  async create(createPsuDto: CreatePsuDto) {
    const psu = this.psuRepository.create(createPsuDto); // Create a new Psu instance
    return await this.psuRepository.save(psu); // Save the new Psu
  }

  async findAll() {
    return await this.psuRepository.find(); // Use TypeORM's find method to get all records
  }

  async findOne(id: number): Promise<Psu | null> { // Return type can be Psu or undefined if not found
    return this.psuRepository.findOne({ where: { psu_id: id } });
  }

  async update(id: number, updatePsuDto: UpdatePsuDto) {
    const psu = await this.psuRepository.findOne({ where: { psu_id: id } });
    if (!psu) {
      throw new Error(`Psu with id ${id} not found`);
    }
    // Update the psu entity with the new values
    Object.assign(psu, updatePsuDto);
    return await this.psuRepository.save(psu); // Save the updated entity back to the database
  }

  async remove(id: number) {
    const psu = await this.psuRepository.findOne({ where: { psu_id: id } });
    if (!psu) {
      throw new Error(`Psu with id ${id} not found`);
    }

    return await this.psuRepository.remove(psu); // Remove the entity from the database
  }
  // async findByName(name: string): Promise<Psu[]> {
  //   return this.psuRepository.find({ where: { psu_name: name } }); // Find PSUs by name
  // }

  async findByPsuFilepath(psuId: number): Promise<string | null> {
    const psu = await this.psuRepository.findOne({ 
      where: { psu_id: psuId },
      select: ['psu_id', 'psuFilepath'] // Select only the necessary fields
    });

    if (!psu) {
      throw new Error(`Psu with id ${psuId} not found`);
    }

    return psu.psuFilepath; // Return the file path of the PSU
  }

   async findAllPaginated(
      paginationDto: paginationDto
    ): Promise<PaginatedResult<Psu>> {
      const page = parseInt(String(paginationDto.page || '1'), 10);
      const limit = parseInt(String(paginationDto.limit || '25'), 10);
      const search = paginationDto.search;
      const offset = paginationDto.offset ? parseInt(String(paginationDto.offset), 10) : (page - 1) * limit;
  
      let query = this.psuRepository
        .createQueryBuilder("psu")
        .orderBy("psu.psu_id", "ASC")
        .where("psu.psu_name ilike :search", {search: search ?`%${search}%` : "%" })
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
