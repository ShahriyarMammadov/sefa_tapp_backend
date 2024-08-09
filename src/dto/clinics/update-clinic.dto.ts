import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

class LocationDto {
  @ApiProperty({ example: '123 Main St', description: 'Address of the clinic' })
  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @ApiProperty({ example: 40.712776, description: 'Latitude of the clinic' })
  @IsNumber()
  @IsNotEmpty()
  readonly lat: number;

  @ApiProperty({ example: -74.005974, description: 'Longitude of the clinic' })
  @IsNumber()
  @IsNotEmpty()
  readonly long: number;
}

export class UpdateClinicsDto {
  @ApiProperty({ example: 'Health Clinic', description: 'Name of the clinic' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ type: LocationDto, description: 'Location of the clinic' })
  @IsNotEmpty()
  readonly location: LocationDto;

  @ApiProperty({ example: 4.5, description: 'Rating of the clinic' })
  @IsNumber()
  @IsNotEmpty()
  readonly rating: number;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'Image URL of the clinic',
  })
  @IsString()
  @IsNotEmpty()
  readonly imageURL: string;

  @ApiProperty({
    example: 'A top health clinic...',
    description: 'About the clinic',
  })
  @IsString()
  @IsNotEmpty()
  readonly about: string;
}
