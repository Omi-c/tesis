import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
    async sendMail(recipientEmail: string, filePath: string): Promise<void> {
        try {
            const senderEmail = 'LaboratorioClinicoLomaLindaCarreno@outlook.com';
            const storedFormData = '';
            const transporter = nodemailer.createTransport({
                host: 'smtp.office365.com',
                port: 587,
                secure: false,
                auth: {
                    user: senderEmail,
                    pass: 'Laboratorio123.',
                },
            });

            const mailOptions = {
                from: senderEmail,
                to: recipientEmail,
                subject: 'Examen de laboratorio',
                text: JSON.stringify(storedFormData, null, 2),
                attachments: [
                    {
                        filename: 'examen.pdf',
                        path: filePath
                    }
                ]
            };

            await transporter.sendMail(mailOptions);
        } catch (error) {
            throw new Error(`Error sending email: ${error}`);
        }
    }
}