import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ssd } from './entities/ssd.entity';
import { CreateSsdDto } from './dto/create-ssd.dto';
import { UpdateSsdDto } from './dto/update-ssd.dto';

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

}
