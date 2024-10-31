import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class RequestResponseLog extends Document {
  @Prop()
  method: string;

  @Prop()
  url: string;

  @Prop({ type: Object })
  requestBody: Record<string, any>;

  @Prop({ type: Object })
  responseBody: Record<string, any>;

  @Prop()
  statusCode: number;
}

export const RequestResponseLogSchema =
  SchemaFactory.createForClass(RequestResponseLog);
