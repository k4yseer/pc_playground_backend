import { Module } from '@nestjs/common';
import { ThreeJsModelsService } from './three-js-models.service';
import { ThreeJsModelsController } from './three-js-models.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThreeJsModel } from './entities/three-js-model.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ThreeJsModel]), // Register the ThreeJsModel entity with TypeORM
  ],
  controllers: [ThreeJsModelsController],
  providers: [ThreeJsModelsService],
})
export class ThreeJsModelsModule {}
