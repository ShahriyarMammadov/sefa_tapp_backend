import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Certificate, Portfolio } from 'src/schema/doctor';

export class UpdateDoctorDto {
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

  @ApiProperty({
    example:
      'https://s3-alpha-sig.figma.com/img/8d8d/437e/0e1b5ad666082616af75ef1cd0d84e11?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=m51T92nVvRWByja~i0XY4bEksnPz7v5Hk1aiXff4O7z3Zfj2ZzTlrK9DrkhQjrut65ATqlgFFmvlAP9oKkUdxfXpxnmbr4etQlnSWNsXv7vl9f-Hx6Ooxb4rCRPKakii1xYp7m4it0-8cKhIInX7N4Knj2R3CDTOd6jGVUETHX-E7pWU3npo9YXF5BEk3y3XxX6PQ-pZtOy3igWJdYGPIZSlCtRu82BD-G5Mo7hffQ-SOOVuUftDIrXWrJmPNASWzKMes5iaE7Qnkw-huNTJC2Az~oyF3iCO565lzYIkCyddhHIuTW1MNie3xxMaphN3ZtofA-MJ2jqCI-QPEvuIbA__',
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
