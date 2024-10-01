import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'shahriyarmammadov16@gmail.com',
    description: 'e-mail',
  })
  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  ipAddress: string;

  @ApiProperty({ example: 'johndoe', description: 'Username' })
  @IsOptional()
  @IsString()
  username: string;

  @ApiProperty({ example: 'password123', description: 'Password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
