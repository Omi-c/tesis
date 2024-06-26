import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { TelegramService } from './telegraf.service';
import { PdfService } from './pdf.service';
import { join } from 'path';
import { LabService } from './test-lab.service';
import { TestLab } from './lab.model';

@Controller('lab')
export class LabController {
  constructor(
    private readonly labService: LabService,
    private readonly telegramService: TelegramService,
    private readonly pdfService: PdfService
  ) { }

  @Get()
  async getAll(@Query('patientId') patientId?: number): Promise<TestLab[]> {
    if (patientId) {
      return this.labService.findByPatientId(patientId);
    } else {
      return this.labService.findAll();
    }
  }

  @Post()
  async createLab(@Body() data: any): Promise<any> {
    const currentDate = new Date();
    const filePath = `${data.patient.first_name}${currentDate.toISOString().replaceAll('-', '').replaceAll('.', '').replaceAll(':', '')}examen.pdf`;
    const pdf = await this.pdfService.generatePdfFromHtml(data, filePath);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const chatId = 2145695861; // Reemplaza esto con el chatId real
    const message = 'Te enviamos un cordial saludo de parte del Laboratorio Clinico Loma Linda Carreño. Aquí te adjuntamos tus resultados de laboratorio.';
    await this.telegramService.sendPdfDocument(chatId, filePath, message);
    await this.labService.create({ path: filePath, patient: data.patient.id });
    return true;
  }
}