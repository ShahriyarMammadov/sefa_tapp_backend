import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRequestResponseLogDto } from 'src/dto/ErrorLog/request-response.dto';
import { RequestResponseLog } from 'src/schema/errorLog/request-response';
import { RequestResponseLogService } from 'src/services/errorLog/request-response.service';

@ApiTags('request-response-log')
@Controller('request-response-log')
export class RequestResponseLogController {
  constructor(private readonly logService: RequestResponseLogService) {}

  @ApiOperation({ summary: 'Request and Response' })
  @ApiBody({
    description: 'error logs',
    type: CreateRequestResponseLogDto,
  })
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
