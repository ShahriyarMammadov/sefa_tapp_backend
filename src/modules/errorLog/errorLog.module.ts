import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ErrorLogController } from 'src/controller/errorLog/errorLog.controller';
import { ErrorLog, ErrorLogSchema } from 'src/schema/errorLog';
import { EmailService } from 'src/services/email/send-email.service';
import { ErrorLogService } from 'src/services/errorLog/errorLog.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ErrorLog.name, schema: ErrorLogSchema },
    ]),
  ],
  controllers: [ErrorLogController],
  providers: [ErrorLogService, EmailService],
})
export class ErrorLogModule {}
