import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
class Location {
  @Prop()
  address: string;

  @Prop()
  lat: number;

  @Prop()
  long: number;
}

export class Comment {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'AppUsers',
    required: true,
  })
  userId: string;

  @Prop({ required: true })
  comment: string;

  @Prop({ default: Date.now })
  date: Date;
}

@Schema({ timestamps: true })
export class Pharmacy extends Document {
  @Prop()
  openHours: string;

  @Prop()
  name: string;

  @Prop({ type: Location })
  location: Location;

  @Prop()
  rating: number;

  @Prop({ images: [String], default: null })
  images: string[] | null;

  @Prop()
  about: string;

  @Prop({ type: [Comment], default: [] })
  comments: Comment[];
}

export const PharmacySchema = SchemaFactory.createForClass(Pharmacy);
