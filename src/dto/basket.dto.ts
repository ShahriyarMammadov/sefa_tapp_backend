import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBasketDto {
  @ApiProperty({ example: '673465de347cee2a2a7a518b', description: 'user id' })
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @ApiProperty({
    example: '67476fa2daad9325d4b2cf11',
    description: 'product id',
  })
  @IsString()
  @IsNotEmpty()
  readonly pharmacyProductId: string;
}
