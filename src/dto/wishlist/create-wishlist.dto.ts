import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class WishlistDto {
  @ApiProperty({
    example: '672910aa89738599313e186b',
    description: 'user id',
  })
  @IsString()
  @IsNotEmpty()
  readonly userID: string;

  @ApiProperty({
    example: '67476fa2daad9325d4b2cf11',
    description: 'pharmacy product ID',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly pharmacyProductId?: string;

  @ApiProperty({
    example: null,
    description: 'Clinic ID',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly clinicID?: string;

  @ApiProperty({
    example: null,
    description: 'Pharmacy ID',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly pharmacyID?: string;
}
