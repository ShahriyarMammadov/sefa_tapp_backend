import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateContactUsDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: '994 50 313 44 73' })
  @IsOptional()
  @IsString()
  readonly phoneNumber: string;

  @ApiProperty({ example: 'shahriyarmammadov16@gmail.com' })
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: 'hello world' })
  @IsString()
  @IsNotEmpty()
  readonly message: string;
}
