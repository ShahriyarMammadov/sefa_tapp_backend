import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
class Location {
  @Prop()
  address: string;

  @Prop()
  lat: number;

  @Prop()
  long: number;
}

@Schema({ timestamps: true })
export class Clinics extends Document {
  @Prop()
  name: string;

  @Prop({ type: Location })
  location: Location;

  @Prop()
  rating: number;

  @Prop()
  imageURL: string;

  @Prop()
  about: string;
}

export const ClinicsSchema = SchemaFactory.createForClass(Clinics);
