import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Gpu {
    @PrimaryGeneratedColumn({ type: 'integer' })
    gpu_id: number;
    
    @Column({ type: 'text' })
    gpu_name: string;
    
    @Column({ type: 'text' })
    gpu_code: string;
    
    @Column({ type: 'text' })
    gpu_interface: string;
    
    @Column({ type: 'text' })
    power_connector: string;
    
    @Column({ type: 'integer' })
    power_connector_slots: number;
    
    @Column({ type: 'text' })
    tdp: string;
    
    @Column({ type: 'integer' })
    dimension: number;

    @Column({ type: 'text', nullable: true })
    gpuFilepath: string | null; // Optional field for the file path of the GPU
}
