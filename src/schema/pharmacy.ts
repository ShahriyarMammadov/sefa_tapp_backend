import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
class Location {
  @Prop()
  address: string;

  @Prop()
  lat: number;

  @Prop()
  long: number;
}

@Schema({ timestamps: true })
export class Pharmacy extends Document {
  @Prop()
  openHours: string;

  @Prop()
  name: string;

  @Prop({ type: Location })
  location: Location;

  @Prop()
  rating: number;

  @Prop({ images: [String], default: null })
  images: string[] | null;

  @Prop()
  about: string;
}

export const PharmacySchema = SchemaFactory.createForClass(Pharmacy);
