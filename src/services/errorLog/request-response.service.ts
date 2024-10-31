import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRequestResponseLogDto } from 'src/dto/ErrorLog/request-response.dto';
import { RequestResponseLog } from 'src/schema/errorLog/request-response';

@Injectable()
export class RequestResponseLogService {
  constructor(
    @InjectModel(RequestResponseLog.name)
    private logModel: Model<RequestResponseLog>,
  ) {}

  async create(
    logData: CreateRequestResponseLogDto,
  ): Promise<RequestResponseLog> {
    const createdLog = new this.logModel(logData);
    return createdLog.save();
  }

  async getAll(): Promise<RequestResponseLog[]> {
    return this.logModel.find().exec();
  }

  async filterByDate(
    startDate: Date,
    endDate: Date,
  ): Promise<RequestResponseLog[]> {
    return this.logModel
      .find({
        createdAt: { $gte: startDate, $lte: endDate },
      })
      .exec();
  }
}
