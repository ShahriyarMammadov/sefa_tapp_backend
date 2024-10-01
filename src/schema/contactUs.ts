import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ContactUs extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phoneNumber: number;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  message: string;
}

export const ContactUsSchema = SchemaFactory.createForClass(ContactUs);
