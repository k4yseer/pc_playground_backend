import { Module } from "@nestjs/common";
// import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "./config/config.module";

@Module({
    imports: [ConfigModule, 
        // DatabaseModule
    ],
})
export class CoreModule {}
