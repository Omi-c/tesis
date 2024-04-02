import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientController } from './patients/patients.controller';
import { PatientService } from './patients/patients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './patients/patient.model';
import { PatientModule } from './patients/patient.module';
import { ResultadosLaboratorioModule } from './resultados-laboratorio/resultados-laboratorio.module';
import { inventaryModule } from './inventary/inventary.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'omi',
      password: 'Lolo123.',
      database: 'clinic_1',
      entities: [Patient],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Ruta a la carpeta de archivos estáticos
    }),
    PatientModule,
    ResultadosLaboratorioModule,
    inventaryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
