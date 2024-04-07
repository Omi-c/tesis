import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TestLab } from './lab.model';
import { PatientService } from 'src/patients/patients.service';

@Injectable()
export class LabService {
    constructor(
        @InjectRepository(TestLab)
        private labRepository: Repository<TestLab>,
        private patientService: PatientService
    ) { }

    create(data: any): Promise<TestLab[]> {
        const { path, patient } = data;
        const lab = new TestLab();
        lab.path = path;
        lab.patient = patient;// await this.patientService.findOne(patient);
        console.log(lab)
        const patientCreate = this.labRepository.create([lab]);
        return this.labRepository.save(patientCreate);
    }

    findAll(): Promise<TestLab[]> {
        return this.labRepository
            .createQueryBuilder('testLab')
            .leftJoinAndSelect('testLab.patient', 'patient')
            .getMany();
    }

    async findByPatientId(patientId: number): Promise<TestLab[]> {
        return this.labRepository
            .createQueryBuilder('testLab')
            .leftJoinAndSelect('testLab.patient', 'patient')
            .where('patient.id = :patientId', { patientId })
            .getMany();

    }
}