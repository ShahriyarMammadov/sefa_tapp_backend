import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateAdminDto } from '../../dto/admin/create-admin.dto';
import { LocalAuthGuard } from '../../local-auth.guard';
import { AdminService } from '../../services/admin/admin.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { LoginDto } from 'src/dto/login/login.dto';

@ApiTags('admin (Register)')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @UseInterceptors()
  @ApiOperation({ summary: 'Create New Admin' })
  @ApiResponse({
    status: 201,
    description: 'Admin user has been created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBody({ type: CreateAdminDto })
  async createAdmin(
    @Res() response: Response,
    @Body() createAdminDto: CreateAdminDto,
  ) {
    try {
      const newAdmin = await this.adminService.createAdmin(createAdminDto);

      return response.status(HttpStatus.CREATED).send({
        message: 'Admin user has been created successfully',
        newAdmin,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: err,
        error: 'Bad Request',
      });
    }
  }

  @UseGuards(LocalAuthGuard)
  @Get()
  @ApiOperation({ summary: 'All Admin' })
  @ApiResponse({
    status: 200,
    description: 'All admin data found successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async getAllAdmin(@Req() request: Request, @Res() response: Response) {
    try {
      const xForwardedFor = request.headers['x-forwarded-for'];
      const ip = Array.isArray(xForwardedFor)
        ? xForwardedFor[0]
        : xForwardedFor || request.ip;
      console.log(ip);

      const admin = await this.adminService.getAllAdmin();

      return response.status(HttpStatus.OK).json({
        message: 'All ADMIN data found successfully',
        admin,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
