import { registerAs } from "@nestjs/config";
import e from "express";
import { DataSourceOptions } from "typeorm";
const postgresConfig = () => {
    return {
    type:"postgres",
    port:5432,
    username:"postgres.rhlbvqmbuppyhseveoyr",
    password: "pcsimulator_heap",
    host: "aws-0-us-east-2.pooler.supabase.com",
    database: "postgres",
    entities: ["dist/*/.entity{.ts,.js}"],
    synchronize: true // Note: Set to false in production
    }
}
export default registerAs("database", () => ({ config: postgresConfig }))
