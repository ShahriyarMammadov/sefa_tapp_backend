import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Otp extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: number;

  @Prop({ required: true })
  otpCode: number;

  @Prop({ required: true })
  expiresAt: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
