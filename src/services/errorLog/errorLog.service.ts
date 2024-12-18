import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateErrorLogDto } from 'src/dto/ErrorLog/errorLog.dto';
import { ErrorLog } from 'src/schema/errorLog';
import { EmailService } from '../email/send-email.service';

@Injectable()
export class ErrorLogService {
  constructor(
    @InjectModel(ErrorLog.name) private errorLogModel: Model<ErrorLog>,
    private readonly emailService: EmailService,
  ) {}

  async create(createErrorLogDto: CreateErrorLogDto): Promise<any> {
    const createdErrorLog = new this.errorLogModel(createErrorLogDto);
    const savedErrorLog = await createdErrorLog.save();

    this.sendEmailNotification(
      'tu1d1f9a@code.edu.az',
      'Tətbiqdə xəta baş verdi.',
      `${createErrorLogDto?.request}`,
    );

    return savedErrorLog;
  }

  private async sendEmailNotification(
    to: string,
    subject: string,
    content: string,
  ): Promise<void> {
    try {
      await this.emailService.sendEmail(to, subject, content);
    } catch (error) {
      console.error('send email error:', error);
    }
  }

  async getAll(): Promise<ErrorLog[]> {
    return this.errorLogModel.find().exec();
  }
}
