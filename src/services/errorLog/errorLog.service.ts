import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateErrorLogDto } from 'src/dto/ErrorLog/errorLog.dto';
import { ErrorLog } from 'src/schema/errorLog/errorLog';

@Injectable()
export class ErrorLogService {
  constructor(
    @InjectModel(ErrorLog.name) private errorLogModel: Model<ErrorLog>,
  ) {}

  async create(createErrorLogDto: CreateErrorLogDto): Promise<ErrorLog> {
    const createdErrorLog = new this.errorLogModel(createErrorLogDto);
    return createdErrorLog.save();
  }

  async getAll(): Promise<ErrorLog[]> {
    return this.errorLogModel.find().exec();
  }

  async filterByDate(startDate: Date, endDate: Date): Promise<ErrorLog[]> {
    return this.errorLogModel
      .find({
        createdAt: { $gte: startDate, $lte: endDate },
      })
      .exec();
  }
}
