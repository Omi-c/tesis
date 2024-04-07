
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitasController } from './citas.controller';
import { CitasService } from './citas.service';
import { Citas } from './citas.model';


@Module({
  imports: [TypeOrmModule.forFeature([Citas])],
  controllers: [CitasController],
  providers: [CitasService]
})
export class citasModule { }