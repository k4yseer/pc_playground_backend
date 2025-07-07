import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ram } from './entities/ram.entity';
import { CreateRamDto } from './dto/create-ram.dto';
import { UpdateRamDto } from './dto/update-ram.dto';

@Injectable()
export class RamService {
  constructor(
    @InjectRepository(Ram)
    private ramRepository: Repository<Ram>, // Inject the repository for Ram entity
  ) {}
  async create(createRamDto: CreateRamDto) {
    const ram = this.ramRepository.create(createRamDto); // Create a new Ram instance
    return this.ramRepository.save(ram); // Save the new Ram instance to the database
  }

  async findAll() {
    return this.ramRepository.find(); // Use TypeORM's find method to get all records
  }

  async findOne(id: number) {
    // Use TypeORM's findOne method to find by primary key 'index'
    // { where: { index: id } } is the explicit way, but for primary keys
    // TypeORM often allows findOne(id) directly if 'id' refers to the primary key.
    // However, findOne({ where: ... }) is more robust for any column.
    return this.ramRepository.findOne({ where: { ram_id: id } });
  }

  update(id: number, updateRamDto: UpdateRamDto) {
    const ram = this.ramRepository.findOne({ where: { ram_id: id } });
    if (!ram) {
      throw new Error(`Ram with id ${id} not found`);
    }
    // Update the ram entity with the new values
    Object.assign(ram, updateRamDto);
    return this.ramRepository.save(ram); // Save the updated entity back to the database
  }

  remove(id: number) {
    const ram = this.ramRepository.findOne({ where: { ram_id: id } });
    if (!ram) {
      throw new Error(`Ram with id ${id} not found`);
    }
    return this.ramRepository.remove(ram); // Remove the entity from the database
  }
}
