import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([Game])], // Register the Game entity with TypeORM
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
