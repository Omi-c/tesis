import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Citas {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date; 


}