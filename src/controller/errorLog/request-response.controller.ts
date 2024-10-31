import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { CreateRequestResponseLogDto } from 'src/dto/ErrorLog/request-response.dto';
import { RequestResponseLog } from 'src/schema/errorLog/request-response';
import { RequestResponseLogService } from 'src/services/errorLog/request-response.service';

@Controller('request-response-log')
export class RequestResponseLogController {
  constructor(private readonly logService: RequestResponseLogService) {}

  @Post()
  async logRequestResponse(@Body() createLogDto: CreateRequestResponseLogDto) {
    return this.logService.create(createLogDto);
  }

  @Get('all')
  async getAll(): Promise<RequestResponseLog[]> {
    return this.logService.getAll();
  }

  @Get('filter-by-date')
  async filterByDate(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<RequestResponseLog[]> {
    return this.logService.filterByDate(new Date(startDate), new Date(endDate));
  }
}
