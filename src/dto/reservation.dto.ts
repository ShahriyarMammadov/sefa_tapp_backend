import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class ServiceDto {
  @ApiProperty({ example: 'Resept yazdır' })
  @IsNotEmpty()
  @IsString()
  readonly serviceName: string;

  @ApiProperty({ example: 50 })
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;
}

export class ReservationDto {
  @ApiProperty({
    example: 'doctor ID',
  })
  @IsString()
  @IsNotEmpty()
  readonly doctorId: string;

  @ApiProperty({
    example: 'user ID',
  })
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @ApiProperty({
    example: '14.11.2024T11:30 AM',
    description: 'reservation time',
  })
  @IsString()
  @IsNotEmpty()
  reservationTime: string;

  @ApiProperty({
    type: [ServiceDto],
    example: [{ serviceName: 'Resept yazdır', price: 50 }],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceDto)
  @IsNotEmpty()
  services: ServiceDto[];

  @ApiProperty({
    example: 'CARD or CASH',
    description: 'payment method',
  })
  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  @IsOptional()
  price: number;

  @IsOptional()
  isActive: boolean;
}
