// src/cpu/entities/cpu.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Cpu {
    @PrimaryGeneratedColumn({type: 'integer'})
    cpu_id: number;

    @Column({ type: 'text' })
    cpu_name: string;

    @Column({ type: 'text' })
    brand: string;

    @Column({ type: 'integer' })
    cpu_tier: string;

    @Column({ type: 'integer' })
    cpu_code: string;

    @Column({ type: 'text' })
    cpu_socket: string;

    @Column({ type: 'text' })
    tdp: string;

    @Column({ type: 'integer' })
    cores: number;

    @Column({ type: 'integer' })
    threads: number;

    @Column({ type: 'text' })
    base_clock: string;

    @Column({ type: 'text' })
    max_clock: string;

    @Column({ type: 'text', nullable: true })
    cpuFilepath: string | null;
}