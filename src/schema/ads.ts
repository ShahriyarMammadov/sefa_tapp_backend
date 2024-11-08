import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Ads extends Document {
  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true })
  category: string;
}

export const AdsSchema = SchemaFactory.createForClass(Ads);
