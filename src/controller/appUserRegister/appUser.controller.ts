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
} from '@nestjs/common';
import { AppUserService } from '../../services/appUserRegister/userRegister.service';
import { CreateAppUserDto } from '../../dto/appUserRegister/create-user.dto';
import { UpdateAppUserDto } from '../../dto/appUserRegister/update-user-dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VerifyOtpDto } from 'src/dto/verifyOTP.dto';

@ApiTags('App (Register)')
@Controller('appUsers')
export class AppUserController {
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
  async registerUser(@Body() createAppUserDto: CreateAppUserDto) {
    return this.appUserService.registerUser(createAppUserDto);
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppUserDto: UpdateAppUserDto) {
    return this.appUserService.update(id, updateAppUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appUserService.remove(id);
  }
}
