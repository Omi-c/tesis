import { Controller, Post, Body } from '@nestjs/common';
import { TelegramService } from './telegraf.service';

@Controller('lab')
export class LabController {
  constructor(
    private readonly telegramService: TelegramService,
    private readonly pdfService: PdfService
  ) {}

  @Post()
  async createLab(@Body() data: any): Promise<any> {
    const filePath = 'examen.pdf';
    const pdf = await this.pdfService.generatePdfFromHtml(data.template, filePath);
    const chatId = 1147360782; // Reemplaza esto con el chatId real
    const message = 'Hola desde backend!';
    await this.telegramService.sendMessage(chatId, message);
    return true;
  }
}