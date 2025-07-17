import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ssd } from './entities/ssd.entity';
import { CreateSsdDto } from './dto/create-ssd.dto';
import { UpdateSsdDto } from './dto/update-ssd.dto';
import { paginationDto, PaginatedResult } from '../paginationDto/pagination.dto'; // Import pagination DTO and result interface

@Injectable()
export class SsdService {
  constructor(
    @InjectRepository(Ssd)
    private ssdRepository: Repository<Ssd>,
  ) {}

  
  async create(createSsdDto: CreateSsdDto) {
    const ssd = this.ssdRepository.create(createSsdDto);
    return await this.ssdRepository.save(ssd);
  }

  async findAll() {
    return await this.ssdRepository.find();
  }

  async findOne(id: number): Promise<Ssd | null> {
    return this.ssdRepository.findOne({ where: { ssd_id: id } });
  }

  async update(id: number, updateSsdDto: UpdateSsdDto) {
    const ssd = await this.ssdRepository.findOne({ where: { ssd_id: id } });
    if (!ssd) {
      throw new Error(`Ssd with id ${id} not found`);
    }
    Object.assign(ssd, updateSsdDto);
    return await this.ssdRepository.save(ssd);
  }

  async remove(id: number) {
    const ssd = await this.ssdRepository.findOne({ where: { ssd_id: id } });
    if (!ssd) {
      throw new Error(`Ssd with id ${id} not found`);
    }
    return await this.ssdRepository.remove(ssd);
  }

  async findBySsdFilepath(ssdId: number): Promise<string | null> {
    const ssd = await this.ssdRepository.findOne({ 
      where: { ssd_id: ssdId },
      select: ['ssd_id', 'ssdFilepath'] // Select only the necessary fields
    });

    if (!ssd) {
      throw new Error(`Ssd with id ${ssdId} not found`);
    }

    return ssd.ssdFilepath;
  }

  async findAllPaginated(
      paginationDto: paginationDto
    ): Promise<PaginatedResult<Ssd>> {
      const page = parseInt(String(paginationDto.page || '1'), 10);
      const limit = parseInt(String(paginationDto.limit || '25'), 10);
      const search = paginationDto.search;
      const offset = paginationDto.offset ? parseInt(String(paginationDto.offset), 10) : (page - 1) * limit;
  
      let query = this.ssdRepository
        .createQueryBuilder("ssd")
        .orderBy("ssd.ssd_id", "ASC")
        .where("ssd.ssd_name ilike :search", {search: search ?`%${search}%` : "%" })
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
