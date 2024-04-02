import { Injectable } from '@nestjs/common';
import { Patient } from './patient.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  create(patient: any): Promise<Patient[]>{
    const patientCreate = this.patientRepository.create(patient);
    return this.patientRepository.save(patientCreate);
  }

  findAll(): Promise<Patient[]> {
    return this.patientRepository.find();
  }

  findOne(id: number): Promise<Patient | null> {
    return this.patientRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.patientRepository.delete(id);
  }
}
