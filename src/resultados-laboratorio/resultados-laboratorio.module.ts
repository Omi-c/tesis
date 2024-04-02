import { Module } from '@nestjs/common';
import { LabController } from './lab.controller';
import { TelegramService } from './telegraf.service';

@Module({
    controllers: [LabController],
    providers: [ TelegramService]
})
export class ResultadosLaboratorioModule {}
