import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Comments extends Document {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'AppUsers',
    required: true,
  })
  user: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Clinics',
    required: false,
  })
  clinic: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Doctor',
    required: false,
  })
  doctor: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Pharmacy',
    required: false,
  })
  pharmacy: string;

  @Prop({ required: true })
  comment: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comments);
