import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'John', description: 'Admin name' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'Doe', description: 'Admin surname' })
  @IsString()
  @IsNotEmpty()
  readonly surname: string;

  @ApiProperty({ example: 'johndoe', description: 'Admin username' })
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ example: 'password123', description: 'Admin password' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Admin email' })
  @IsString()
  @IsNotEmpty()
  readonly email: string;
}
