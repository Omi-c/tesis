import { Module } from '@nestjs/common';
import { LabController } from './LabController';
import { TelegramService } from './telegraf.service';
import { PdfService } from './pdf.service';
import { LabService } from './test-lab.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestLab } from './lab.model';
import { PatientService } from 'src/patients/patients.service';
import { Patient } from 'src/patients/patient.model';
import { MailerService } from './mail.service';

@Module({
    imports: [TypeOrmModule.forFeature([TestLab, Patient])],
    controllers: [LabController],
    providers: [PdfService, TelegramService, LabService, PatientService, MailerService]
})
export class ResultadosLaboratorioModule { }
