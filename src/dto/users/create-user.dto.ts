import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  MinLength,
  Matches,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Shahriyar Mammadov', description: 'Full name' })
  @IsString()
  @IsNotEmpty()
  readonly fullName: string;

  @ApiProperty({
    example: 'shahriyarmammadov16@gmail.com',
    description: 'E-mail',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email address' })
  readonly email: string;

  @ApiProperty({
    example: '503134473',
    description: 'Phone number (typeof Number)',
  })
  @IsString()
  @IsNotEmpty()
  readonly phoneNumber: string;

  @ApiProperty({
    example: 'password123',
    description: 'password123',
  })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/^(?=.*[!@#\$%\^&\*])/, {
    message: 'Password must contain at least one special character',
  })
  @Matches(/^[A-Z]/, {
    message: 'Password must start with an uppercase letter',
  })
  readonly password: string;

  @ApiProperty({
    example: 'password123',
    description: 'password123',
  })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/^(?=.*[!@#\$%\^&\*])/, {
    message: 'Password must contain at least one special character',
  })
  @Matches(/^[A-Z]/, {
    message: 'Repeat Password must start with an uppercase letter',
  })
  readonly repeatPassword: string;

  @ApiProperty({
    example: null,
    description: null,
  })
  @IsOptional()
  readonly ipAddress: string;

  @ApiProperty({
    example: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1',
    description: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1',
  })
  @IsString()
  @IsOptional()
  readonly profileImageURL: string;
}
