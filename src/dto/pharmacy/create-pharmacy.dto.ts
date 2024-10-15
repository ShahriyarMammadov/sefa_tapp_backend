import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
} from 'class-validator';

class LocationDto {
  @ApiProperty({
    example: '123 Main St',
    description: 'Address of the pharmacy',
  })
  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @ApiProperty({ example: 40.712776, description: 'Latitude of the pharmacy' })
  @IsNumber()
  @IsNotEmpty()
  readonly lat: number;

  @ApiProperty({
    example: -74.005974,
    description: 'Longitude of the pharmacy',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly long: number;
}

export class CommentDto {
  @ApiProperty({
    example: 'userId123',
    description: 'ID of the user who made the comment',
  })
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @ApiProperty({
    example: 'Great service and friendly staff!',
    description: 'Content of the comment',
  })
  @IsString()
  @IsNotEmpty()
  readonly comment: string;

  @ApiProperty({
    description: 'Date when the comment was made',
    example: '2024-10-13T12:00:00Z',
  })
  @IsOptional()
  readonly date: Date;
}

export class CreatePharmacyDto {
  @ApiProperty({
    example: 'Zeytun aptek',
    description: 'Name of the Pharmacy',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 4.5, description: 'Rating of the Pharmacy' })
  @IsNumber()
  @IsNotEmpty()
  readonly rating: number;

  @ApiProperty({ example: '24/7', description: 'Open hours' })
  @IsString()
  @IsNotEmpty()
  readonly openHours: string;

  @ApiProperty({ type: LocationDto, description: 'Location of the Pharmacy' })
  @IsNotEmpty()
  readonly location: LocationDto;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'Images URL of the Pharmacy',
  })
  @IsOptional()
  readonly images: string | null;

  @ApiProperty({
    example: 'A top health Pharmacy...',
    description: 'About the Pharmacy',
  })
  @IsString()
  @IsNotEmpty()
  readonly about: string;

  @ApiProperty({
    type: [CommentDto],
    description: 'Comments for the Pharmacy',
    required: false,
  })
  @IsOptional()
  @IsArray()
  readonly comments?: CommentDto[];
}
