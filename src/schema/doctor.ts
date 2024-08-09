import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Doctor extends Document {
  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  hospitalName: string;

  @Prop()
  workExperience: number;

  @Prop()
  rating: number;

  @Prop()
  imageURL: string;

  @Prop({ type: [String], default: null })
  certificates: string[] | null;

  @Prop({ type: [String], default: null })
  portfolio: string[] | null;

  @Prop()
  specialty: string;

  @Prop()
  about: string;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
