import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateErrorLogDto } from 'src/dto/ErrorLog/errorLog.dto';
import { ErrorLog } from 'src/schema/errorLog';

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

  async filterByDate(startDate: string, endDate: string): Promise<ErrorLog[]> {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error('error time format');
      }

      return this.errorLogModel
        .find({
          createdAt: { $gte: start, $lte: end },
        })
        .exec();
    } catch (error) {
      console.error('Error filtering by date:', error);
      throw new Error('Filter by date failed');
    }
  }
}
