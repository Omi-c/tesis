import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import * as fs from 'fs';
import { join } from 'path';


@Injectable()
export class TelegramService {
  private bot: Telegraf;

  constructor() {
    this.bot = new Telegraf('5811027492:AAEacM9yDDTr56eGMp9WAb4loWCYTzMBjfs');
  }

  async sendMessage(chatId: number, message: string): Promise<void> {
    try {
      await this.bot.telegram.sendMessage(chatId, message);

    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  async sendPdfDocument(chatId: number, filePath: string, caption: string): Promise<void> {
    const fullPath = join('src', 'public', filePath);
    const documentStream = fs.createReadStream(fullPath);
    await this.bot.telegram.sendDocument(chatId, { source: documentStream, filename: 'examen.pdf' }, { caption });
  }
}