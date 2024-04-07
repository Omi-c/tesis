import { Patient } from 'src/patients/patient.model';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class TestLab {

    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(type => Patient)
    patient: Patient;
    @Column()
    path: string;
}