import { Document } from 'mongoose';

export interface Doctor extends Document {
  readonly name: string;
  readonly surname: string;
  readonly hospitalName: string;
  readonly workExperience: number;
  readonly rating: number;
  readonly imageURL: string;
  readonly certificates: any;
  readonly portfolio: any;
  readonly specialty: string;
  readonly about: string;
}
