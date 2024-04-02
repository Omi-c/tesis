import { Controller, Post, Body } from '@nestjs/common';
import { TelegramService } from './telegraf.service';
import { PdfService } from './pdf.service';

@Controller('lab')
export class LabController {
  constructor(
    private readonly telegramService: TelegramService,
    private readonly pdfService: PdfService
  ) {}

  @Post()
  async createLab(@Body() data: any): Promise<any> {
    const currentDate = new Date();
    console.log(currentDate);
    const filePath = `${data.patient}${currentDate.toISOString().replaceAll('-', '').replaceAll('.', '').replaceAll(':', '')}examen.pdf`;
    const pdf = await this.pdfService.generatePdfFromHtml(data.template, filePath);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const chatId = 2145695861; // Reemplaza esto con el chatId real
    const message = 'Te enviamos un cordial saludo de parte del Laboratorio Clinico Loma Linda Carreño. Aquí te adjuntamos tus resultados de laboratorio.';
    await this.telegramService.sendPdfDocument(chatId, filePath, message);
    return true;
  }
}