// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { CreateAdminDto } from '../../dto/admin/create-admin.dto';
// import { Admin } from '../../schema/admin';
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export class AdminService {
//   constructor(
//     @InjectModel(Admin.name)
//     private readonly adminModel: Model<Admin>,
//   ) {}

//   saltOrRounds: number = 10;

//   async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
//     const newAdmin = new this.adminModel({
//       ...createAdminDto,
//     });

//     const hashPass = await bcrypt.hash(newAdmin.password, this.saltOrRounds);
//     newAdmin.password = hashPass;

//     return newAdmin.save();
//   }

//   async getAllAdmin(): Promise<Admin[]> {
//     return this.adminModel.find().exec();
//   }

//   async findOne(username: string): Promise<Admin | undefined> {
//     return this.adminModel.findOne({ username }).exec();
//   }
// }
