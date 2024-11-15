import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateErrorLogDto } from 'src/dto/ErrorLog/errorLog.dto';
import { ErrorLog } from 'src/schema/errorLog';
import { ErrorLogService } from 'src/services/errorLog/errorLog.service';

@ApiTags('Error Log')
@Controller('error-log')
export class ErrorLogController {
  constructor(private readonly errorLogService: ErrorLogService) {}

  @ApiOperation({ summary: 'Error Logs' })
  @ApiBody({
    description: 'error logs',
    type: CreateErrorLogDto,
  })
  @Post()
  async logError(@Body() createErrorLogDto: CreateErrorLogDto) {
    return this.errorLogService.create(createErrorLogDto);
  }

  @Get('all')
  async getAll(): Promise<ErrorLog[]> {
    return this.errorLogService.getAll();
  }
}
