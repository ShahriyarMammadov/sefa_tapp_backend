import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Medicine extends Document {
  @Prop()
  name: string;

  @Prop()
  tablet: number;

  @Prop()
  rating: number;

  @Prop()
  imageURL: string;

  @Prop({ images: [String], default: null })
  images: string[] | null;

  @Prop()
  price: number;

  @Prop()
  numberAvailable: number;

  @Prop()
  about: string;
}

export const MedicineSchema = SchemaFactory.createForClass(Medicine);
