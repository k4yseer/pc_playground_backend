import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>, // Inject the repository for Game entity
  ) {}
  
  async create(createGameDto: CreateGameDto) {
    const game = this.gameRepository.create(createGameDto); // Create a new Game instance
    return await this.gameRepository.save(game); // Save the new Game instance to the database
  }

  async findAll() {
    return await this.gameRepository.find(); // Use TypeORM's find method to get all records
  }

  async findOne(id: number): Promise<Game | null> { // Return type can be Game or undefined if not found
    return this.gameRepository.findOne({ where: { game_id: id } });
  }

  async update(id: number, updateGameDto: UpdateGameDto) {
    const game = await this.gameRepository.findOne({ where: { game_id: id } });
    if (!game) {
      throw new Error(`Game with id ${id} not found`);
    }
    // Update the game entity with the new values
    Object.assign(game, updateGameDto);
    return await this.gameRepository.save(game); // Save the updated entity back to the database
  }

  async remove(id: number) {
    const game = await this.gameRepository.findOne({ where: { game_id: id } });
    if (!game) {
      throw new Error(`Game with id ${id} not found`);
    }
    return await this.gameRepository.remove(game); // Remove the entity from the database
  }
}
