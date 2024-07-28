import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from '../schema/admin';
import { AdminController } from '../controller/admin/admin-us.controller';
import { AdminService } from '../services/admin/admin.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
