import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ErrorLog extends Document {
  @Prop({ required: false, type: Object })
  message: Record<string, any>;

  @Prop({ required: false, type: Object })
  header: Record<string, any>;

  @Prop()
  stack: string;

  @Prop()
  statusCode: number;

  @Prop()
  method: string;

  @Prop()
  url: string;

  @Prop({ required: false, type: Object })
  request: Record<string, any>;

  @Prop({ required: false, type: Object })
  response: Record<string, any>;
}

export const ErrorLogSchema = SchemaFactory.createForClass(ErrorLog);
