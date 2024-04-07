import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as PDFDocument from 'pdfkit';
import QRCode from 'qrcode';

@Injectable()
export class PdfService {
  async generatePdfFromHtml(html: string, filePath: string): Promise<void> {
    const pdfDoc = new PDFDocument();

    // Pipe PDF document to a write stream
    const writeStream = fs.createWriteStream(filePath);
    pdfDoc.pipe(writeStream);
  
    // Embed QR code into PDF
    // const qrOptions = {
    //   type: 'png', // You can change this to other formats like svg
    //   margin: 2,
    //   color: {
    //     dark: '#000', // Dark color
    //     light: '#fff', // Light color
    //   },
    // };
  
    // const qrImageBuffer = await QRCode.toBuffer(filePath, qrOptions);
    // pdfDoc.image(qrImageBuffer, { width: 100, height: 100 });
  
    // Add HTML content
    pdfDoc.text(html);
  
    // End and close the PDF document
    pdfDoc.end();
  
    // Wait for the write stream to finish writing
    await new Promise<void>((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });
  }
}