
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientController } from './patients.controller';
import { PatientService } from './patients.service';
import { Patient } from './patient.model';
import { TelegramService } from './telegraf.service';


@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  controllers: [PatientController],
  providers: [PatientService, TelegramService]
})
export class PatientModule { }