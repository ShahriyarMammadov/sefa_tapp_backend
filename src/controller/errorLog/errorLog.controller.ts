import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { CreateErrorLogDto } from 'src/dto/ErrorLog/errorLog.dto';
import { ErrorLog } from 'src/schema/errorLog/errorLog';
import { ErrorLogService } from 'src/services/errorLog/errorLog.service';

@Controller('error-log')
export class ErrorLogController {
  constructor(private readonly errorLogService: ErrorLogService) {}

  @Post()
  async logError(@Body() createErrorLogDto: CreateErrorLogDto) {
    return this.errorLogService.create(createErrorLogDto);
  }

  @Get('all')
  async getAll(): Promise<ErrorLog[]> {
    return this.errorLogService.getAll();
  }

  @Get('filter-by-date')
  async filterByDate(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<ErrorLog[]> {
    return this.errorLogService.filterByDate(
      new Date(startDate),
      new Date(endDate),
    );
  }
}
