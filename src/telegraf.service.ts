import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';

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

  async sendDocument(chatId: number, document: string): Promise<void>{
    try {
      await this.bot.telegram.replyWithDocument(chatId, document)
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
}