import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as PDFDocument from 'pdfkit';
import * as qrcode from 'qrcode';
import jsPDF from 'jspdf';
import { join } from 'path';
import logo from "logo.png";

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

      //  membrete 
      const generarMembrete = (doc) => {
        const imgData = logo; 
        const imgWidth = 50; 
        const imgHeight = 50; 
        doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        const membrete = "Laboratorio Clínico Loma Linda Carreño\nVenezuela, Edo. Carabobo. Guacara, Negro Primero";
        doc.setFontSize(14);
        doc.text(membrete, 70, 35);
      };

      // Añadir membrete al PDF
      generarMembrete(doc);
      yOffset += 65;
      
      const fileDocument = `localhost:3001/${filePath}`;
      const qrCodeDataURL = await qrcode.toDataURL(fileDocument);
      doc.addImage(qrCodeDataURL, 'PNG', 10, 10, 50, 50);
      yOffset += 60;
      doc.text("Resultados de Análisis de Laboratorio", 70, yOffset);
      yOffset += 5;
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

        selectedTests.forEach((test, index) => {
          const examData = `Examen ${index + 1}: ${test}`;
          doc.text(examData, 20, yOffset);
          yOffset += 10;
    
          // resultados del examen
          switch (test) {
            case 'Prueba de HIV':
            case 'VDRL':
            case 'Antidoping':
            case 'Prueba de COVID':
            case 'Urocultivo':
            case 'Prueba de Embarazo':
            case 'Dengue':
            case 'Hepatitis B':
            case 'Exudado Faringeo':
              doc.text("Valores del análisis:", 20, yOffset);
              yOffset += 7;
              doc.text("Estado:", 20, yOffset);
             
              const selectOptions = ["Positivo", "Negativo"];
              const selectedOption = selectOptions[Math.floor(Math.random() * selectOptions.length)];
              doc.text(selectedOption, 35, yOffset);
              yOffset += 10; 
              break;
            case 'Enzimas Cardiacas':
              doc.text("Valores del análisis: ", 20, yOffset);
              yOffset += 7;
              doc.text(`CK: ${document.querySelector('#CK').value}`, 20, yOffset);
              yOffset += 7;
              doc.text(`CKMH: ${document.querySelector('#CKMH').value}`, 20, yOffset);
              yOffset += 7;
              doc.text(`Troponina: ${document.querySelector('#Troponina').value}`, 20, yOffset);
              yOffset += 10;
              break;         
            case 'Hematología':
                doc.text("Valores del análisis:", 20, yOffset);
                yOffset += 7;
                // Añadir resultados de los exámenes de hematología
                doc.text("Hemoglobina: " + document.querySelector('#Hemoglobina').value, 20, yOffset);
                yOffset += 7;
                doc.text("Hematocritos: " + document.querySelector('#Hematocritos').value, 20, yOffset);
                yOffset += 7;
                doc.text("CHCM: " + document.querySelector('#CHCM').value, 20, yOffset);
                yOffset += 7;
                doc.text("Glóbulos blancos: " + document.querySelector('#GlobulosBlancos').value, 20, yOffset);
                yOffset += 7;
                doc.text("Plaquetas: " + document.querySelector('#Plaquetas').value, 20, yOffset);
                yOffset += 7;
                doc.text("Neotrofilos: " + document.querySelector('#Neotrofilos').value + "%", 20, yOffset);
                yOffset += 7;
                doc.text("Linfocitos: " + document.querySelector('#Linfocitos').value + "%", 20, yOffset);
                yOffset += 7;
                doc.text("Monocitos: " + document.querySelector('#Monocitos').value + "%", 20, yOffset);
                yOffset += 7;
                doc.text("Eosinofilos: " + document.querySelector('#Eosinofilos').value + "%", 20, yOffset);
                yOffset += 7;
                doc.text("Basofilos: " + document.querySelector('#Basofilos').value + "%", 20, yOffset);
                yOffset += 10;
                break;
            case 'Prueba de Orina':
                  doc.text("Valores del análisis:", 20, yOffset);
                  yOffset += 7;
                  
                  // Añadir resultados de la prueba de orina
                  doc.text("Color: " + document.querySelector('#Color').value, 20, yOffset);
                  yOffset += 7;
                  doc.text("Proteinas: " + document.querySelector('#Proteinas').value, 20, yOffset);
                  yOffset += 7;
                  doc.text("Glucosa: " + document.querySelector('#Glucosa').value, 20, yOffset);
                  yOffset += 7;
                  doc.text("Hemoglobina: " + document.querySelector('#Hemoglobina').value, 20, yOffset);
                  yOffset += 7;
                  doc.text("PH: " + document.querySelector('#PH').value, 20, yOffset);
                  yOffset += 7;
                  doc.text("Hematies: " + document.querySelector('#Hematies').value, 20, yOffset);
                  yOffset += 7;
                  doc.text("Densidad: " + document.querySelector('#Densidad').value, 20, yOffset);
                  yOffset += 7;
                  doc.text("Cantidad: " + document.querySelector('#Cantidad').value, 20, yOffset);
                  yOffset += 7;
                  
                  doc.text("Nitritos: " + document.querySelector('#Nitritos').options[document.querySelector('#Nitritos').selectedIndex].text, 20, yOffset);
                  yOffset += 7;
                  doc.text("Bilirrubina: " + document.querySelector('#Bilirrubina').options[document.querySelector('#Bilirrubina').selectedIndex].text, 20, yOffset);
                  yOffset += 7;
                  doc.text("Urobilina: " + document.querySelector('#Urobilina').options[document.querySelector('#Urobilina').selectedIndex].text, 20, yOffset);
                  yOffset += 7;
                  doc.text("Pig. Bili: " + document.querySelector('#PigBili').options[document.querySelector('#PigBili').selectedIndex].text, 20, yOffset);
                  yOffset += 7;
                  doc.text("Cetona: " + document.querySelector('#Cetona').options[document.querySelector('#Cetona').selectedIndex].text, 20, yOffset);
                  yOffset += 7;
                  doc.text("Cristales: " + document.querySelector('#Cristales').options[document.querySelector('#Cristales').selectedIndex].text, 20, yOffset);
                  yOffset += 7;
                  doc.text("Bacterias: " + document.querySelector('#Bacterias').options[document.querySelector('#Bacterias').selectedIndex].text, 20, yOffset);
                  yOffset += 7;
                  doc.text("Mucina: " + document.querySelector('#Mucina').options[document.querySelector('#Mucina').selectedIndex].text, 20, yOffset);
                  yOffset += 10;
                  break;   
            case 'Prueba de Heces':
                    doc.text("Valores del análisis:", 10, yOffset);
                    yOffset += 7;
                    
                    // Añadir resultados de la prueba de heces
                    doc.text("Color: " + document.querySelector('#ColorHeces').value, 20, yOffset);
                    yOffset += 7;
                    doc.text("Olor: " + document.querySelector('#OlorHeces').value, 20, yOffset);
                    yOffset += 7;
                    doc.text("Aspecto: " + document.querySelector('#AspectoHeces').value, 20, yOffset);
                    yOffset += 7;
                    doc.text("Consistencia: " + document.querySelector('#ConsistenciaHeces').value, 20, yOffset);
                    yOffset += 7;
                    doc.text("Reacción: " + document.querySelector('#ReaccionHeces').value, 20, yOffset);
                    yOffset += 7;
                    
                    const selectedSangreHeces = document.querySelector('#SangreHeces').options[document.querySelector('#SangreHeces').selectedIndex].text;
                    doc.text("Sangre: " + selectedSangreHeces, 20, yOffset);
                    yOffset += 7;
                    
                    const selectedMocoHeces = document.querySelector('#MocoHeces').options[document.querySelector('#MocoHeces').selectedIndex].text;
                    doc.text("Moco: " + selectedMocoHeces, 20, yOffset);
                    yOffset += 7;
                    
                    const selectedDetritosHeces = document.querySelector('#DetritosHeces').options[document.querySelector('#DetritosHeces').selectedIndex].text;
                    doc.text("Detritos: " + selectedDetritosHeces, 20, yOffset);
                    yOffset += 10;
                    break;             
            case 'VSG':
              doc.text("Valores del análisis:", 20, yOffset);
              yOffset += 7;
                      
              doc.text("Eritrosedimentación: " + document.querySelector('#Eritrosedimentacion').value + " mm/1h", 20, yOffset);
              yOffset += 10;
            break;        
            case 'PCR':
            doc.text("Valores del análisis:", 20, yOffset);
            yOffset += 7;
            doc.text("PCR: " + document.querySelector('#PCR').value + " mg/L", 20, yOffset);
            yOffset += 10;
            break;
            case 'PT, PTT':
            doc.text("Valores del análisis:", 20, yOffset);
            yOffset += 7;
            doc.text("PT: " + document.querySelector('#PT').value, 20, yOffset);
            yOffset += 7;
            doc.text("PTT: " + document.querySelector('#PTT').value, 20, yOffset);
            yOffset += 10;
            break;
            case 'Química Sanguínea':
            doc.text("Valores del análisis:", 10, yOffset);
            yOffset += 7;
          
            doc.text("Glucosa: " + document.querySelector('#Glucosa').value + " mg/dL", 10, yOffset);
            yOffset += 7;
            doc.text("Colesterol: " + document.querySelector('#Colesterol').value + " mg/dL", 10, yOffset);
            yOffset += 7;
            doc.text("Creatinina: " + document.querySelector('#Creatinina').value + " mg/dL", 10, yOffset);
            yOffset += 7;
            doc.text("Urea: " + document.querySelector('#Urea').value + " mg/dL", 10, yOffset);
            yOffset += 7;
            doc.text("Trigliceridos: " + document.querySelector('#Trigliceridos').value + " mg/dL", 10, yOffset);
            yOffset += 7;
            doc.text("Bilirrubina: " + document.querySelector('#Bilirrubina').value + " mg/dL", 10, yOffset);
            yOffset += 10;
            break;
            case 'Grupo Sanguíneo':
            doc.text("Valores del análisis:", 20, yOffset);
            yOffset += 7;
            
            // Obtener el valor seleccionado del campo de selección
            var grupoSanguineoSelect = document.querySelector('#grupoSanguineo');
            var grupoSanguineo = grupoSanguineoSelect.options[grupoSanguineoSelect.selectedIndex].text;
  
            // Añadir resultados de Grupo Sanguíneo
            doc.text("Grupo sanguíneo: " + grupoSanguineo, 20, yOffset);
            yOffset += 10;
            break;
            default:
              break;
          }
        });
      }

      
      const fullPath = join('src', 'public', filePath);
      doc.save(fullPath);
    } catch (error) {
      console.log(error);
    }


    // Add HTML content

  }
}