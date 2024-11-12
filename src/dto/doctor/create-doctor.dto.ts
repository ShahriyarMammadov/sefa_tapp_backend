import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import {
  AvailableTime,
  Certificate,
  Portfolio,
  Prices,
} from 'src/schema/doctor';

export class CreateDoctorDto {
  @ApiProperty({ example: 'Fidan', description: 'name' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'Haqverdiyeva', description: 'surname' })
  @IsNotEmpty()
  @IsString()
  readonly surname: string;

  @ApiProperty({ example: 'Avqust 27, 1999', description: 'date of birth' })
  @IsNotEmpty()
  @IsString()
  readonly dateOfBirth: string;

  @ApiProperty({ example: 'Azərbaycan', description: 'nationality' })
  @IsNotEmpty()
  @IsString()
  readonly nationality: string;

  @ApiProperty({ example: 'Yeni Klinika', description: 'hospitalName' })
  @IsOptional()
  readonly hospitalName: string;

  @ApiProperty({ example: 2, description: 'Work experience' })
  @IsNotEmpty()
  @IsNumber()
  readonly workExperience: number;

  @ApiProperty({
    example: 'Stomatoloq',
    description: 'specialty',
  })
  @IsNotEmpty()
  @IsString()
  readonly specialty: string;

  @ApiProperty({
    example: 'Hi, I am Doctor',
    description: 'about',
  })
  @IsOptional()
  readonly about: string;

  @ApiProperty({
    example: 'doctor@gmail.com',
    description: 'email address',
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: '+994-(50)-313-44-73',
    description: 'phoneNumber',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  readonly phoneNumber: string;

  @ApiProperty({
    example:
      'https://static.vecteezy.com/system/resources/thumbnails/028/287/555/small_2x/an-indian-young-female-doctor-isolated-on-green-ai-generated-photo.jpg',
    description: 'Doctor image',
  })
  @IsOptional()
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
    example: [],
    description: 'Services',
    type: [Prices],
  })
  @IsOptional()
  readonly services: Prices[];

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
}
