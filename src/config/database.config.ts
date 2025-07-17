import { registerAs } from "@nestjs/config";
import e from "express";
import { DataSourceOptions } from "typeorm";
const postgresConfig = () => {
    return {
    type:"postgres",
    port:5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.HOST,
    database: "postgres",
    entities: ["dist/*/.entity{.ts,.js}"],
    synchronize: false // Note: Set to false in production
    }
}
export default registerAs("database", () => ({ config: postgresConfig }))
