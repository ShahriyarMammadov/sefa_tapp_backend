import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Query,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { AppUserService } from '../../services/user/userRegister.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VerifyOtpDto } from 'src/dto/verifyOTP.dto';
import { AppUserWithComments } from 'src/services/user/userRegister.service';
import { CreateUserDto } from 'src/dto/users/create-user.dto';
import { UpdateUserDto } from 'src/dto/users/update-user-dto';
import { Request } from 'express';

@ApiTags('Register')
@Controller('User')
export class UserController {
  constructor(private readonly appUserService: AppUserService) {}

  @Post('verify-otp')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify OTP and activate user' })
  @ApiBody({
    description: 'User credentials for OTP verification',
    type: VerifyOtpDto,
  })
  @ApiResponse({
    status: 200,
    description:
      'The OTP was successfully verified and the user was activated.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid OTP or user not found.',
  })
  async verifyOtpAndCreateUser(
    @Body('email') email: string,
    @Body('phoneNumber') phoneNumber: string,
    @Body('otp') otp: string,
  ) {
    if (!email || !phoneNumber || !otp) {
      throw new BadRequestException(
        'Email, phone number, and OTP code are required.',
      );
    }
    return this.appUserService.verifyOtp(email, phoneNumber, otp);
  }

  @Post('register')
  async registerUser(
    @Body() CreateUserDto: CreateUserDto,
    @Req() req: Request,
  ) {
    return this.appUserService.registerUser(CreateUserDto, req);
  }

  // Get all users based on isActive status
  @Get('all')
  async findAll(@Query('isActive') isActive: string) {
    let status = null;
    if (isActive === 'true') status = true;
    else if (isActive === 'false') status = false;

    return this.appUserService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appUserService.findOne(id);
  }

  @Get(':id/comments')
  async commentsByUserId(
    @Param('id') id: string,
  ): Promise<AppUserWithComments> {
    return this.appUserService.commentsByUserId(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto) {
    return this.appUserService.update(id, UpdateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appUserService.remove(id);
  }
}
