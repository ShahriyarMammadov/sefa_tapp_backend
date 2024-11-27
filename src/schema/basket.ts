import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Basket extends Document {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'AppUsers',
    required: true,
  })
  user: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Pharmacy',
    required: true,
  })
  pharmacy: string;
}

export const BasketSchema = SchemaFactory.createForClass(Basket);
