import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestResponseLogController } from 'src/controller/errorLog/request-response.controller';
import {
  RequestResponseLog,
  RequestResponseLogSchema,
} from 'src/schema/errorLog/request-response';
import { RequestResponseLogService } from 'src/services/errorLog/request-response.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RequestResponseLog.name, schema: RequestResponseLogSchema },
    ]),
  ],
  controllers: [RequestResponseLogController],
  providers: [RequestResponseLogService],
})
export class RequestResponseModule {}
