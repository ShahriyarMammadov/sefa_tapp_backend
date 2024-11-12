import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/controller/users/users.controller';
import { AppUsers, userSchema } from 'src/schema/users';
import { Otp, OtpSchema } from 'src/schema/otp';
import { AppUserService } from 'src/services/user/userRegister.service';
import { PharmacyModule } from 'src/modules/pharmacy.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AppUsers.name, schema: userSchema },
      { name: Otp.name, schema: OtpSchema },
    ]),
    PharmacyModule,
  ],
  controllers: [UserController],
  providers: [AppUserService],
  exports: [MongooseModule, AppUserService],
})
export class AppRegisterModule {}
