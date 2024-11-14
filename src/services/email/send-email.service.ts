import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'info@sefatapp.com',
        pass: 'bw96bqyZ5e9M',
      },
    });
  }
  // constructor() {
  //   this.transporter = nodemailer.createTransport({
  //     service: 'gmail',
  //     auth: {
  //       user: 'shahriyarmammadov16@gmail.com',
  //       pass: 'ipteqypnfwfqhcuu',
  //     },
  //   });
  // }

  // bw96bqyZ5e9M

  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    const mailOptions = {
      from: 'info@sefatapp.com',
      to,
      subject,
      html,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
