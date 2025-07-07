import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Game {
    @PrimaryGeneratedColumn({ type: 'integer' })
    game_id: number;

    @Column({ type: 'text' })
    game: string;

    @Column({ type: 'text' })
    processor: string;

    @Column({ type: 'text' })
    memory: string;

    @Column({ type: 'text' })
    graphics: string;

    @Column({ type: 'text' })
    image: string;

    @Column({ type: 'text', nullable: true })
    directx: string;

    @Column({ type: 'text' })
    storage: string;
}



