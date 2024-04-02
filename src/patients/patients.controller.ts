import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { Patient } from './patient.model';
import { PatientService } from './patients.service';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  async getAllPatients(): Promise<Patient[]> {
    return this.patientService.findAll();
  }

  @Get(':id')
  async updateUser(@Param('id', ParseIntPipe) id: number) {
      return await this.patientService.findOne(id);
  }

  @Post()
  async createPatient(@Body() patientData: Patient): Promise<any> {
    return this.patientService.create(patientData);
  }
}
