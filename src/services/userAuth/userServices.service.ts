import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppUsers } from '../../schema/appRegister';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(AppUsers.name) private readonly userModel: Model<AppUsers>,
  ) {}

  async findByEmail(email: string): Promise<AppUsers | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findByPhoneNumber(phoneNumber: string): Promise<AppUsers | null> {
    return this.userModel.findOne({ phoneNumber }).exec();
  }
}
