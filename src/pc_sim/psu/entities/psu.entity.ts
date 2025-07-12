import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Psu {
    @PrimaryGeneratedColumn({ type: 'integer' })
    psu_id: number;
    
    @Column({ type: 'text' })
    psu_name: string;
    
    @Column({ type: 'text' })
    type: string;
    
    @Column({ type: 'text' })
    modular: string;
    
    @Column({ type: 'integer' })
    max_power: number;
    
    @Column({ type: 'text' })
    efficiency: string;
    
    @Column({ type: 'integer' })
    atx_24pin: number;
    
    @Column({ type: 'integer' })
    epsatx_8pin: number;
    
    @Column({ type: 'integer' })
    pcie_8pin: number;
    
    @Column({ type: 'integer' })
    _12vhpwr_16pin: number;
    
    @Column({ type: 'integer' })
    sata: number;
    
    @Column({ type: 'text' })
    dimension: string;

    @Column({ type: 'text', nullable: true })
    psuFilepath: string | null; // Optional field for the file path of the
}
