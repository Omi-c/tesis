import { Controller, Post, Body } from '@nestjs/common';
import { TelegramService } from './telegraf.service';

@Controller('lab')
export class LabController {
  constructor(
    private readonly telegramService: TelegramService
  ) {}

  @Post()
  async createLab(@Body() data: any): Promise<any> {
    console.log(data);
    return true;
  }
}