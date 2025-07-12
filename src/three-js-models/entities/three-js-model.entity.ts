import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('threejsModel')
export class ThreeJsModel {
    @PrimaryGeneratedColumn({ type: 'integer' })
    id: number;
    
    @Column({ type: 'text' })
    componentName: string; // Name of the component (e.g., CPU, GPU, RAM)

    @Column({ type: 'text' })
    filepath: string; // File path of the 3D model
}

