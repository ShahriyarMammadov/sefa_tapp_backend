import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class PharmacyProducts extends Document {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Pharmacy',
    required: true,
  })
  pharmacyId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  numberAvailable: number;

  @Prop({ default: 0 })
  averageRating: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  about: string;

  @Prop({ images: [String], default: null })
  images: string[] | null;
}

export const PharmacyProductsSchema =
  SchemaFactory.createForClass(PharmacyProducts);
