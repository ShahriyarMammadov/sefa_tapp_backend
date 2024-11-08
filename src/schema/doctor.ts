import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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

@Schema({ timestamps: true })
export class Doctor extends Document {
  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  hospitalName: string;

  @Prop()
  workExperience: number;

  @Prop()
  rating: number;

  @Prop()
  imageURL: string;

  @Prop({ type: [Certificate], default: null })
  certificates: Certificate[] | null;

  @Prop({ type: [Portfolio], default: null })
  portfolio: Portfolio[] | null;

  @Prop({ type: [AvailableTime] })
  availableTimes: AvailableTime[];

  @Prop({ type: [Prices], default: [] })
  services: Prices[];

  @Prop()
  specialty: string;

  @Prop()
  about: string;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
