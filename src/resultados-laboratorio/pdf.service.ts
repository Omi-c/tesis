import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class PdfService {
  async generatePdfFromHtml(html: string, filePath: string): Promise<void> {
    const pdfDoc = new PDFDocument();
    pdfDoc.pipe(await fs.createWriteStream(filePath));
    pdfDoc.text(html);
    pdfDoc.end();
  }
}