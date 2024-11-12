import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorService } from '../services/doctor/doctor.service';
import { DoctorController } from '../controller/doctor/doctor.controller';
import { Doctor, DoctorSchema } from '../schema/doctor';
import { Comments, CommentSchema } from 'src/schema/comments';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Doctor.name, schema: DoctorSchema },
      { name: Comments.name, schema: CommentSchema },
    ]),
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
  exports: [MongooseModule, DoctorService],
})
export class DoctorModule {}
