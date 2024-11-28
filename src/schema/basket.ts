import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Basket extends Document {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'AppUsers',
    required: true,
  })
  userId: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'PharmacyProducts',
    required: true,
  })
  pharmacyProductId: string;
}

export const BasketSchema = SchemaFactory.createForClass(Basket);
