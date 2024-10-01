import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Blog extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  imageURL: string;

  @Prop({ required: false, default: 'Admin' })
  createdWith: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
