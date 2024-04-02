import { Module } from '@nestjs/common';
import { LabController } from './lab.controller';
import { TelegramService } from './telegraf.service';

@Module({
    controllers: [LabController],
    providers: [PdfService, TelegramService]
})
export class ResultadosLaboratorioModule {}
