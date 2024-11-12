import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CommentDto {
  @ApiProperty({
    example: '672910aa89738599313e186b',
    description: 'User ID',
  })
  @IsOptional()
  readonly user?: string;

  @ApiProperty({
    example: '672910aa89738599313e186b',
    description: 'Clinic ID',
  })
  @IsOptional()
  readonly clinic?: string;

  @ApiProperty({
    example: '672910aa89738599313e186b',
    description: 'Doctor ID',
  })
  @IsOptional()
  readonly doctor?: string;

  @ApiProperty({
    example: '672910aa89738599313e186b',
    description: 'Pharmacy ID',
  })
  @IsOptional()
  readonly pharmacy?: string;

  @ApiProperty({
    example: 'hi, all services very good',
    description: 'Comment text',
  })
  @IsNotEmpty()
  @IsString()
  readonly comment: string;

  @ApiProperty({
    example: '5',
    description: 'rating star count',
  })
  @IsOptional()
  readonly rating: number;
}
