import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class Certificate {
  @Prop({ required: false })
  url: string;

  @Prop({ required: false })
  description: string;
}

export class Portfolio {
  @Prop({ required: false })
  url: string;

  @Prop({ required: false })
  description: string;
}

export class TimeSlot {
  @ApiProperty({
    example: '11:30 AM',
    description: 'Time slot in 12-hour format',
  })
  @IsString()
  time: string;

  @ApiProperty({
    example: 'available',
    description: 'Status of the time slot',
    default: 'available',
  })
  @IsString()
  status: string;
}

export class AvailableTime {
  @ApiProperty({
    example: '09.11.2024',
    description: 'Date for the available time slots',
  })
  @IsString()
  period: string;

  @ApiProperty({
    type: [TimeSlot],
    description: 'List of available time slots',
    default: [],
  })
  @IsNotEmpty()
  slots: TimeSlot[];
}

export class Prices {
  @Prop()
  serviceName: string;

  @Prop()
  price: number;
}

export class Location {
  @ApiProperty({ example: '123 Main St', description: 'Address' })
  @IsOptional()
  @IsString()
  readonly address: string;

  @ApiProperty({ example: 40.712776, description: 'Latitude' })
  @IsOptional()
  @IsNumber()
  readonly latitude: number;

  @ApiProperty({ example: -74.005974, description: 'Longitude' })
  @IsOptional()
  @IsNumber()
  readonly longitude: number;
}

@Schema({ timestamps: true })
export class Doctor extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true })
  dateOfBirth: string;

  @Prop({ default: 'Azərbaycan' })
  nationality: string;

  @Prop({ required: true })
  specialty: string;

  @Prop({ default: null })
  hospitalName: string;

  @Prop({ default: 2 })
  workExperience: number;

  @Prop({ default: null })
  about: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({
    default:
      'https://static.vecteezy.com/system/resources/thumbnails/028/287/555/small_2x/an-indian-young-female-doctor-isolated-on-green-ai-generated-photo.jpg',
  })
  imageURL: string;

  @Prop({ type: [Certificate], default: null })
  certificates: Certificate[] | null;

  @Prop({ type: [Portfolio], default: null })
  portfolio: Portfolio[] | null;

  @Prop({ type: [AvailableTime], default: null })
  availableTimes: AvailableTime[];

  @Prop({ type: [Prices], default: [] })
  services: Prices[];

  @Prop({ type: [Location], default: null })
  location: Location[];

  @Prop({ default: 0 })
  averageRating: number;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
