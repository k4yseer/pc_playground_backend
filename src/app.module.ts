import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { CpuModule } from './pc_sim/cpu/cpu.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

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
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
        // synchronize: true // Note: Set to false in production
      })
    }),
    // CoreModule,
    CpuModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
