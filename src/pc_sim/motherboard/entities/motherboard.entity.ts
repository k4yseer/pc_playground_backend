import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Motherboard {
    @PrimaryGeneratedColumn({ type: 'integer' })
    motherboard_id: number;
    
    @Column({ type: 'text' })
    motherboard_name: string;
    
    @Column({ type: 'text' })
    form_factor: string;
    
    @Column({ type: 'text' })
    socket: string;
    
    @Column({ type: 'text' })
    chipset: string;
    
    @Column({ type: 'text' })
    ram_type: string;
    
    @Column({ type: 'integer' })
    ram_max_size: number;
    
    @Column({ type: 'text' })
    ram_max_speed: string;
    
    @Column({ type: 'integer' })
    ram_slots: number;
    
    @Column({ type: 'integer' })
    pcie_x16: number;
    
    @Column({ type: 'text' })
    m2_support: string;
    
    @Column({ type: 'integer' })
    m2_connectors: number;
    
    @Column({ type: 'integer' })
    sata_6gbs: number;

    @Column({ type: 'text' , nullable: true })
    motherboardFilepath: string | null; // Optional field for the file path of the motherboard

}
