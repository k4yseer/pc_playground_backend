import { Module } from '@nestjs/common';
import { PsuService } from './psu.service';
import { PsuController } from './psu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Psu } from './entities/psu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Psu])], // Register the Psu entity with TypeORM
  controllers: [PsuController],
  providers: [PsuService],
})
export class PsuModule {}
