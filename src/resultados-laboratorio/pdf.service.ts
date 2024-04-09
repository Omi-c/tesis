import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as PDFDocument from 'pdfkit';
import * as qrcode from 'qrcode';
import jsPDF from 'jspdf';
import { join } from 'path';

@Injectable()
export class PdfService {
  async generatePdfFromHtml(data: any, filePath: string): Promise<void> {
    function formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1; // Se suma 1 porque los meses van de 0 a 11
      const year = date.getFullYear();
  
      return `${day}/${month}/${year}`;
    }

    try {
      const doc = new jsPDF();
      let yOffset = 10;
      doc.setFontSize(12);
      const fileDocument = `localhost:3001/${filePath}`;
      const qrCodeDataURL = await qrcode.toDataURL(fileDocument);
      doc.addImage(qrCodeDataURL, 'PNG', 10, 10, 50, 50);
      yOffset += 60;
      doc.text("Resultados de exámenes", 10, yOffset);
      yOffset += 10;
      if (data.patient) {
        const selectedPatientData = data.patient;
        yOffset += 10; 
        doc.text("Información del paciente:", 10, yOffset);
        yOffset += 10;
        doc.text(`Nombre: ${selectedPatientData.first_name}`, 10, yOffset);
        yOffset += 7;
        doc.text(`Apellido: ${selectedPatientData.last_name}`, 10, yOffset);
        yOffset += 7;
        doc.text(`Cédula: ${selectedPatientData.ci_number}`, 10, yOffset);
        yOffset += 7;
        doc.text(`Fecha de Nacimiento: ${formatDate(selectedPatientData.born_date)}`, 10, yOffset);
      }
      const fullPath = join('src', 'public', filePath);
      doc.save(fullPath);
    } catch (error) {
      console.log(error);
    }


    // Add HTML content

  }
}