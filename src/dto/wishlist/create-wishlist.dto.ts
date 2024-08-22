import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class WishlistDto {
  @ApiProperty({
    example: '66b5bc1010a888446bf92e85',
    description: 'user id',
  })
  @IsString()
  @IsNotEmpty()
  readonly userID: string;

  @ApiProperty({
    example: '66bba45df6fabb6b6c153788',
    description: 'Medicine ID',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly medicineID?: string;

  @ApiProperty({
    example: null,
    description: 'Clinic ID',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly clinicID?: string;
}
