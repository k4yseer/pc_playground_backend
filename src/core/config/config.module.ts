import { Module } from '@nestjs/common';
import { ConfigModule as ConfigModulePackage } from '@nestjs/config';
import databaseConfig from '../../config/database.config';

@Module({
    imports: [ConfigModulePackage.forRoot({
        envFilePath: ".env",
        load: [databaseConfig],
        isGlobal: true,
    })],
})
export class ConfigModule {}
