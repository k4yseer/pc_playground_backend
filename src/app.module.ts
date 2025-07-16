import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { CpuModule } from './pc_sim/cpu/cpu.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { RecommendationModule } from './recommendation/recommendation.module';
import { CpuCaseModule } from './pc_sim/cpu_case/cpu_case.module';
import { CpuCoolerModule } from './pc_sim/cpu_cooler/cpu_cooler.module';
import { GameModule } from './pc_sim/game/game.module';
import { GpuModule } from './pc_sim/gpu/gpu.module';
import { MotherboardModule } from './pc_sim/motherboard/motherboard.module';
import { PsuModule } from './pc_sim/psu/psu.module';
import { SsdModule } from './pc_sim/ssd/ssd.module';
import { RamModule } from './pc_sim/ram/ram.module';
import { ThreeJsModelsModule } from './three-js-models/three-js-models.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        port: 5432,
        username: configService.get<string>("DATABASE_USER"),
        password :configService.get<string>("DATABASE_PASSWORD"),
        host: configService.get<string>("HOST"),
        database: "postgres",
        entities: [join(process.cwd(), '/../**/*.entity.js')],
        // synchronize: true // Note: Set to false in production
      })
    }),

    RecommendationModule,
    CpuModule, CpuCaseModule, CpuCoolerModule, GameModule, GpuModule, MotherboardModule,
    PsuModule, SsdModule, RamModule, ThreeJsModelsModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
