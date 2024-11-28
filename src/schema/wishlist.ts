import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Wishlist extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Admin', required: true })
  userID: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'PharmacyProducts' })
  pharmacyProductId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Clinics' })
  clinicID?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Pharmacy' })
  pharmacyID?: Types.ObjectId;
}

export const WishlistSchema = SchemaFactory.createForClass(Wishlist);
