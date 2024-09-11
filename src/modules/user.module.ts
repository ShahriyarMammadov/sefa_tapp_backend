import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from 'src/services/userAuth/userServices.service';
import { AppUsers, AppUsersSchema } from 'src/schema/appRegister';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AppUsers.name, schema: AppUsersSchema },
    ]),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
