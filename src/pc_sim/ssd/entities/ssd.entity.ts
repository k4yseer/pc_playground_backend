import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ssd {
    @PrimaryGeneratedColumn({ type: 'integer' })
    ssd_id: number;
    
    @Column({ type: 'text' })
    ssd_name: string;
    
    @Column({ type: 'text' })
    interface: string; // e.g., SATA, NVMe
    
    @Column({ type: 'text' })
    m2_format: string; // e.g., M.2 2280, M.2 2230
    
    @Column({ type: 'text' })
    capacity: string; // e.g., "500GB", "1TB"
}


