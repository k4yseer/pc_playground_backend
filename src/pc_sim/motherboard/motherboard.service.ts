import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Motherboard } from './entities/motherboard.entity';
import { CreateMotherboardDto } from './dto/create-motherboard.dto';
import { UpdateMotherboardDto } from './dto/update-motherboard.dto';

@Injectable()
export class MotherboardService {
  constructor(
    @InjectRepository(Motherboard)
    private motherboardRepository: Repository<Motherboard>, // Inject the repository for Motherboard entity
  ) {}
  async create(createMotherboardDto: CreateMotherboardDto) {
    const motherboard = this.motherboardRepository.create(createMotherboardDto); // Create a new Motherboard instance
    return await this.motherboardRepository.save(motherboard); // Save the new Motherboard instance to the database
  }

  async findAll() {
    return await this.motherboardRepository.find(); // Use TypeORM's find method to get all records
  }

  async findOne(id: number): Promise<Motherboard | null> { // Return type can be Motherboard or undefined if not found
    return this.motherboardRepository.findOne({ where: { motherboard_id: id } }); // Return a specific Motherboard by its ID
  }

  async update(id: number, updateMotherboardDto: UpdateMotherboardDto) {
    const motherboard = await this.motherboardRepository.findOne({ where: { motherboard_id: id } });
    if (!motherboard) {
      throw new Error(`Motherboard with id ${id} not found`);
    }
    // Update the motherboard entity with the new values
    Object.assign(motherboard, updateMotherboardDto);
    return await this.motherboardRepository.save(motherboard); // Save the updated entity back to the database
  }

  async remove(id: number) {
    const motherboard = await this.motherboardRepository.findOne({ where: { motherboard_id: id } });
    if (!motherboard) {
      throw new Error(`Motherboard with id ${id} not found`);
    }
    return await this.motherboardRepository.remove(motherboard); // Remove the entity from the database
  }

  async findByMotherboardFilepath(motherboardId: number): Promise<string | null> {
    const motherboard = await this.motherboardRepository.findOne({ 
      where: { motherboard_id: motherboardId },
      select: ['motherboard_id', 'motherboardFilepath'] // Select only the necessary fields
    });

    if (!motherboard) {
      throw new Error(`Motherboard with id ${motherboardId} not found`);
    }

    return motherboard.motherboardFilepath; // Return the file path of the motherboard
  }
}
