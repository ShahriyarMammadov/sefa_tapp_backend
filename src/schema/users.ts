import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class AppUsers extends Document {
  @Prop()
  fullName: string;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  password: string;

  @Prop()
  repeatPassword: string;

  @Prop()
  ipAddress: string;

  @Prop()
  profileImageURL: string;

  @Prop({ default: false })
  isActive: boolean;
}

export const userSchema = SchemaFactory.createForClass(AppUsers);
