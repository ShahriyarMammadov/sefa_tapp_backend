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
import { Request } from 'express';
import { CreateAdminDto } from '../../dto/admin/create-admin.dto';
import { LocalAuthGuard } from '../../local-auth.guard';
import { AdminService } from '../../services/admin/admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @UseInterceptors()
  async createAdmin(@Res() response, @Body() CreateAdminDto: CreateAdminDto) {
    try {
      const newAdmin = await this.adminService.createAdmin(CreateAdminDto);

      return response.status(HttpStatus.CREATED).send({
        message: 'admin user has been created successfully',
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
  async getAllAdmin(@Req() request: Request, @Res() response) {
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
