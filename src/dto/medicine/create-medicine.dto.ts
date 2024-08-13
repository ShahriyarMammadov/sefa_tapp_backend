import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateMedicineDto {
  @ApiProperty({
    example: 'Aksenfort',
    description: 'Name of the medicine',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 4.5, description: 'Rating of the medicine' })
  @IsNumber()
  @IsNotEmpty()
  readonly rating: number;

  @ApiProperty({ example: 550, description: 'Tabletka' })
  @IsNumber()
  @IsNotEmpty()
  readonly tablet: number;

  @ApiProperty({ example: 5.1, description: 'Price of medicine' })
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty({ example: 100, description: 'numberAvailable of medicine' })
  @IsNumber()
  @IsNotEmpty()
  readonly numberAvailable: number;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'Image URL of the clinic',
  })
  @IsString()
  @IsNotEmpty()
  readonly imageURL: string;

  @ApiProperty({
    example: 'A top health medicine...',
    description: 'About the medicine',
  })
  @IsString()
  @IsNotEmpty()
  readonly about: string;
}
