// import { Module } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';

// @Module({
//     imports: [TypeOrmModule.forRootAsync({
//         useFactory: (configService: ConfigService) => {
//             return configService.get("database.config")
//         }, inject: [ConfigService]
//     }),
//     ],
// })
// export class DatabaseModule { }
