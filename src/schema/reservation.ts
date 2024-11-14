import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export class Services {
  @Prop({ required: true })
  serviceName: string;

  @Prop({ required: true })
  price: number;
}

@Schema({ timestamps: true })
export class Reservation extends Document {
  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'Doctor',
  })
  doctorId: string;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'AppUsers',
  })
  userId: string;

  @Prop({ required: true })
  reservationTime: string;

  @Prop({ required: true, type: [Services] })
  services: Services[];

  @Prop({ required: true })
  paymentMethod: string;

  @Prop({ required: false, default: false })
  isPayment: boolean;

  @Prop({ required: false, default: null })
  price: number;

  @Prop({ required: false, default: true })
  isActive: boolean;
}

export const reservationSchema = SchemaFactory.createForClass(Reservation);
