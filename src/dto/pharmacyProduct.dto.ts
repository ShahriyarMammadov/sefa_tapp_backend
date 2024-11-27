import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePharmacyProductDto {
  @ApiProperty({
    description: 'The ID of the pharmacy this product belongs to',
    example: '61f6e9f24b12345e6789abcd',
  })
  @IsNotEmpty()
  @IsString()
  pharmacyId: string;

  @ApiProperty({
    description: 'The name of the pharmacy product',
    example: 'Pain Reliever',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The number of available units in stock',
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  numberAvailable: number;

  // @ApiProperty({
  //   description: 'The average rating of the product',
  //   example: 4.5,
  //   required: false, // Opsiyonel alanları belirtmek için
  // })
  @IsOptional()
  @IsNumber()
  averageRating?: number;

  @ApiProperty({
    description: 'The price of the product',
    example: 19.99,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Detailed description of the product',
    example: 'Effective for reducing mild to moderate pain.',
  })
  @IsNotEmpty()
  @IsString()
  about: string;

  @ApiProperty({
    description: 'Array of image URLs for the product',
    example: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[] | null;
}
