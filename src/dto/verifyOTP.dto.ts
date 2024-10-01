import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty({
    example: 'shahriyarmammadov16@gmail.com',
    description: 'User email',
  })
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: '503134473', description: 'User phone number' })
  @IsString()
  @IsNotEmpty()
  readonly phoneNumber: string;

  @ApiProperty({ example: '123456', description: 'OTP code sent to the user' })
  @IsNumber()
  @IsNotEmpty()
  readonly otp: number;
}
