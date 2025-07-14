import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CpuCooler {
    @PrimaryGeneratedColumn({ type: 'integer' })
    cpu_cooler_id: number;

    @Column({ type: 'text' })
    cooler_name: string;

    @Column({ type: 'text', nullable: true })
    intel_socket: string;

    @Column({ type: 'text', nullable: true })
    amd_socket: string;

    @Column({ type: 'integer' })
    reccomended_tdp: number;

    @Column({ type: 'text' })
    dimension: string;

    @Column({ type: 'text'})
    cooler_type: string;
}

