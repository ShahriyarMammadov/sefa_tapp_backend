import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RequestResponseLog } from 'src/schema/errorLog/request-response';
import { ErrorLog } from 'src/schema/errorLog/errorLog';

@Injectable()
export class CleanupService {
  private readonly logger = new Logger(CleanupService.name);

  constructor(
    @InjectModel(ErrorLog.name) private readonly errorLogModel: Model<ErrorLog>,
    @InjectModel(RequestResponseLog.name)
    private readonly requestResponseLogModel: Model<RequestResponseLog>,
  ) {}

  // 2 week
  @Cron('58 23 * * *')
  async cleanupOldLogs() {
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    // delete error-log 2 week
    const errorLogDeleteResult = await this.errorLogModel.deleteMany({
      createdAt: { $lt: twoWeeksAgo },
    });
    this.logger.log(
      `Deleted ${errorLogDeleteResult.deletedCount} old error logs.`,
    );

    // delete request-response-log 2 week
    const requestResponseLogDeleteResult =
      await this.requestResponseLogModel.deleteMany({
        createdAt: { $lt: twoWeeksAgo },
      });
    this.logger.log(
      `Deleted ${requestResponseLogDeleteResult.deletedCount} old request-response logs.`,
    );
  }
}
