import { Injectable } from '@nestjs/common';
import { CreateRamDto } from './dto/create-ram.dto';
import { UpdateRamDto } from './dto/update-ram.dto';

@Injectable()
export class RamService {
  create(createRamDto: CreateRamDto) {
    return 'This action adds a new ram';
  }

  findAll() {
    return `This action returns all ram`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ram`;
  }

  update(id: number, updateRamDto: UpdateRamDto) {
    return `This action updates a #${id} ram`;
  }

  remove(id: number) {
    return `This action removes a #${id} ram`;
  }
}
