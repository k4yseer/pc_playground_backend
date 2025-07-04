import {Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CpuCase {
    @PrimaryGeneratedColumn({ type: 'integer' })
    cpu_case_id: number;

    @Column({ type: 'text' })
    case_name: string;

    @Column({ type: 'text' })
    case_type: string;

    @Column({ type: 'text' })
    motherboard_support: string;

    @Column({ type: 'integer' })
    psu_size_clearance: number;

    @Column({ type: 'integer' })
    gpu_size_clearance: number; 

    @Column({ type: 'integer' })
    cpu_cooler_clearance: number;

    @Column({ type: 'text' })
    dimension: string;
}
