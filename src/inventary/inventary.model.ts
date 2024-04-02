import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Inventary {
    
    @PrimaryGeneratedColumn()
    id: number; //id

    @Column()
    name: string; //nombre

    @Column()
    quantity: number; //cantidad

}