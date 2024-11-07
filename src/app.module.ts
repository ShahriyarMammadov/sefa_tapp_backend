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
import { RequestResponseModule } from './modules/errorLog/request-response.module';
import { CleanupModule } from './modules/errorLog/clearJob.module';
import { CommentModule } from './modules/comment.module';

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
    RequestResponseModule,
    CleanupModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
