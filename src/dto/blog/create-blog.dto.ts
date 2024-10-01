import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateBlogDto {
  @ApiProperty({ example: 'Kardiologiya', description: 'Name of the blog' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'lorem ipsum dolor sit amet' })
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'Image URL of the Blog',
  })
  @IsString()
  @IsNotEmpty()
  readonly imageURL: string;

  @ApiProperty({
    example: 'Admin',
  })
  @IsOptional()
  readonly createdWith?: string;
}
