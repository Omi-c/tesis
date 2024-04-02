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
    const chatId = 1147360782; // Reemplaza esto con el chatId real
    const message = 'Hola desde NestJS!';
    await this.telegramService.sendMessage(chatId, message);
    return this.patientService.create(patientData);
  }
}
