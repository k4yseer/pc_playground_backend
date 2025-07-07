import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Ram {
    @PrimaryGeneratedColumn({ name: 'ram_id' })
    ramId: number;
    
    @Column({ name: 'ram_name', type: 'text' })
    ramName: string;
    
    @Column({ name: 'ram_type', type: 'text' })
    ramType: string;
    
    @Column({ name: 'capacity', type: 'text' })
    capacity: string;
    
    @Column({ name: 'speed', type: 'text' })
    speed: string;
}
