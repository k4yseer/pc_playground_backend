import { Module } from '@nestjs/common';
import { MotherboardService } from './motherboard.service';
import { MotherboardController } from './motherboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Motherboard } from './entities/motherboard.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Motherboard])], // Register the Motherboard entity with TypeORM
  controllers: [MotherboardController],
  providers: [MotherboardService],
})
export class MotherboardModule {}
