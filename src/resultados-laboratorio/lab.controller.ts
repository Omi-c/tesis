import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { Patient } from './patient.model';
import { PatientService } from './patients.service';
import { TelegramService } from 'src/patients/telegraf.service';

@Controller('lab')
export class LabController {
  constructor(
    private readonly patientService: PatientService,
    private readonly telegramService: TelegramService
  ) {}

  @Post()
  async createLab(@Body() data: any): Promise<any> {
    console.log(data);
    return true;
  }
}