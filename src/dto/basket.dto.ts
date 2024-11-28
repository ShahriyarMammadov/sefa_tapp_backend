import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBasketDto {
  @ApiProperty({ example: 'Health Clinic', description: 'Name of the clinic' })
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @ApiProperty({ example: 'Health Clinic', description: 'Name of the clinic' })
  @IsString()
  @IsNotEmpty()
  readonly test: string;
}
