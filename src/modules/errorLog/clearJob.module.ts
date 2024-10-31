import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { ErrorLog, ErrorLogSchema } from 'src/schema/errorLog/errorLog';
import {
  RequestResponseLog,
  RequestResponseLogSchema,
} from 'src/schema/errorLog/request-response';
import { CleanupService } from 'src/services/errorLog/clearJob.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: ErrorLog.name, schema: ErrorLogSchema },
      { name: RequestResponseLog.name, schema: RequestResponseLogSchema },
    ]),
  ],
  providers: [CleanupService],
})
export class CleanupModule {}
