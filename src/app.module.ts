import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { EmailService } from './services/email/send-email.service';
import { DoctorModule } from './modules/doctor.module';
import { ClinicsModule } from './modules/clinics.module';
import { MedicineModule } from './modules/medicine.module';
import { WishlistModule } from './modules/wishlist.module';
import { AppRegisterModule } from './modules/register.module';
import { ContactUsModule } from './modules/contactUs.module';
import { BlogModule } from './modules/blog.module';
import { PharmacyModule } from './modules/pharmacy.module';
import { ErrorLogModule } from './modules/errorLog/errorLog.module';
import { CleanupModule } from './modules/errorLog/clearJob.module';
import { CommentModule } from './modules/comment.module';
import { AdsModule } from './modules/ads.module';
import { ReservationModule } from './modules/reservation.module';
import { SearchModule } from './modules/search.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://SefaTapp:sehriyar4473@cluster0.n9byabe.mongodb.net/?retryWrites=true&w=majority',
    ),
    MulterModule.register({
      dest: './uploads',
    }),
    AuthModule,
    DoctorModule,
    ClinicsModule,
    MedicineModule,
    WishlistModule,
    AppRegisterModule,
    ContactUsModule,
    BlogModule,
    PharmacyModule,
    ErrorLogModule,
    CleanupModule,
    CommentModule,
    AdsModule,
    ReservationModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
