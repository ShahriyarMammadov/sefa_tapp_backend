import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ErrorLog extends Document {
  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  header: string;

  @Prop()
  stack: string;

  @Prop()
  statusCode: number;

  @Prop()
  method: string;

  @Prop()
  url: string;
}

export const ErrorLogSchema = SchemaFactory.createForClass(ErrorLog);
