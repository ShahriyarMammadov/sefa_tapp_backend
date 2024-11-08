import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdsDto {
  @ApiProperty({
    example: 'https://imageUrl.com',
    description: 'image url of the ADS',
  })
  @IsString()
  @IsNotEmpty()
  readonly imageUrl: string;

  @ApiProperty({
    example: 'doctor, pharmacy, homePage and etc.',
    description: 'categoty',
  })
  @IsString()
  @IsNotEmpty()
  readonly category: string;
}
