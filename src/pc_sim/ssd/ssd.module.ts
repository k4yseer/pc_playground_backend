import { Module } from '@nestjs/common';
import { SsdService } from './ssd.service';
import { SsdController } from './ssd.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ssd } from './entities/ssd.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ssd])], // Register the Ssd entity with TypeORM
  controllers: [SsdController],
  providers: [SsdService],
})
export class SsdModule {}
