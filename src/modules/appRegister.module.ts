import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppUserController } from 'src/controller/appUserRegister/appUser.controller';
import { AppUsers, AppUsersSchema } from 'src/schema/appRegister';
import { Otp, OtpSchema } from 'src/schema/otp';
import { AppUserService } from 'src/services/appUserRegister/userRegister.service';
import { EmailService } from 'src/services/email/send-email.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AppUsers.name, schema: AppUsersSchema },
      { name: Otp.name, schema: OtpSchema },
    ]),
  ],
  controllers: [AppUserController],
  providers: [AppUserService, EmailService],
  exports: [MongooseModule],
})
export class AppRegisterModule {}
