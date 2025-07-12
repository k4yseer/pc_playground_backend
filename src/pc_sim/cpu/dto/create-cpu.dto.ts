import { IsString, IsNotEmpty, IsOptional, isNotEmpty, Min, IsNumber } from 'class-validator';

export class CreateCpuDto {
    @IsNotEmpty()
    @IsString()
    cpu_name: string;

    @IsNotEmpty()
    @IsString()
    brand: string;

    @IsNotEmpty()
    @IsString()
    cpu_tier: string;

    @IsNotEmpty()
    @IsString()
    cpu_code: string;

    @IsNotEmpty()
    @IsString()
    cpu_socket: string;

    @IsNotEmpty()
    @IsString()
    tdp: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    cores: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    threads: number;

    @IsNotEmpty()
    @IsString()
    base_clock: string;

    @IsNotEmpty()
    @IsString()
    max_clock: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    cpuFilepath?: string | null; // Optional field for the file path of the CPU
}
