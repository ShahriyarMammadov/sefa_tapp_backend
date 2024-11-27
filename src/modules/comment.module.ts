import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsController } from 'src/controller/comments/comment.controller';
import { Comments, CommentSchema } from 'src/schema/comments';
import { CommentsService } from 'src/services/comments/comments.service';
import { PharmacyModule } from './pharmacy.module';
import { DoctorModule } from './doctor.module';
import { ClinicsModule } from './clinics.module';
import { AppRegisterModule } from './register.module';
import { PharmacyProductsModule } from './pharmacyProducts.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comments.name, schema: CommentSchema }]),
    AppRegisterModule,
    PharmacyModule,
    PharmacyProductsModule,
    DoctorModule,
    ClinicsModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [MongooseModule, CommentsService],
})
export class CommentModule {}
