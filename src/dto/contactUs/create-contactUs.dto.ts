import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateContactUsDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 994503134473 })
  @IsNumber()
  @IsNotEmpty()
  readonly phoneNumber: number;

  @ApiProperty({ example: 'user@gmail.com' })
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: 'hello world' })
  @IsString()
  @IsNotEmpty()
  readonly message: string;
}
