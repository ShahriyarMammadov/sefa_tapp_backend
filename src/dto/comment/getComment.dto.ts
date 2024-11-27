import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetCommentDto {
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
    example: '67476fa2daad9325d4b2cf11',
    description: 'Pharmacy product ID',
  })
  @IsOptional()
  readonly pharmacyProduct?: string;

  @ApiProperty({
    example: '672910aa89738599313e186b',
    description: 'Pharmacy ID',
  })
  @IsOptional()
  readonly pharmacy?: string;
}
