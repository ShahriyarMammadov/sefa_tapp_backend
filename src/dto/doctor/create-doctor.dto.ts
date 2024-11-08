import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { AvailableTime, Certificate, Portfolio } from 'src/schema/doctor';

export class CreateDoctorDto {
  @ApiProperty({ example: 'John', description: 'Doctor name' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'Doe', description: 'Doctor surname' })
  @IsString()
  @IsNotEmpty()
  readonly surname: string;

  @ApiProperty({ example: 'Mərkəzi Klinika', description: 'hospitalName' })
  @IsString()
  @IsNotEmpty()
  readonly hospitalName: string;

  @ApiProperty({ example: 5, description: 'Work experience' })
  @IsNumber()
  @IsNotEmpty()
  readonly workExperience: number;

  @ApiProperty({ example: 4, description: 'Rating' })
  @IsNumber()
  @IsNotEmpty()
  readonly rating: number;

  @ApiProperty({
    example:
      'https://s3-alpha-sig.figma.com/img/cdc3/2d8b/1a3146e31f785ea69e71a0ebaa090ea4?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UFz84bMlrteFxsAlMbmruh42knNIHrgr9v9XXEZRMz6YWfVaVIBX0iMMTYD2nyZ5IKfq6J1cGITHekMmt8FcqpZDgxhWiQywDjfRlV7IqulzwXDIGHDykjYBMcrnuwQY44lRh1gYS8oTeUBJyXPD84kuNdwOzIAEA1Io5~EufDhCNgXxXP~3WDWFDs7TtnchAK7~9Mqnl-axQH-8kq8OifclQtPBbNyQrDc1AJbWZu8EGuk6fLv1KjNk2SWTfAko5AEZlTEn9~-8GMDGM927CSSfTLSocnBUdEoHq6jgw9g0p19fFAmW8fgGEajhHHei8U9T8ykRTbmi7~Y-K3dkDA__',
    description: 'Doctor image',
  })
  @IsString()
  @IsNotEmpty()
  readonly imageURL: string;

  @ApiProperty({
    example: null,
    description: 'Doctor certificates (optional)',
    type: [Certificate],
  })
  @IsOptional()
  readonly certificates: Portfolio[];

  @ApiProperty({
    example: null,
    description: 'Doctor portfolio (optional)',
    type: [Portfolio],
  })
  @IsOptional()
  readonly portfolio?: Portfolio[];

  @ApiProperty({
    example: [
      {
        period: '09.11.2024',
        slots: [{ time: '11:30 AM', status: 'available' }],
      },
    ],
    description: 'Doctor available times',
    type: [AvailableTime],
  })
  @IsNotEmpty()
  readonly availableTimes?: AvailableTime[];

  @ApiProperty({
    example: 'psixoloq',
    description: 'Doctors specialty',
  })
  @IsString()
  @IsNotEmpty()
  readonly specialty: string;

  @ApiProperty({
    example: 'lorem50',
    description: 'Doctors about',
  })
  @IsString()
  @IsNotEmpty()
  readonly about: string;
}
