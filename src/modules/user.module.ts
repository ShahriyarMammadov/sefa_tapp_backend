import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from 'src/services/userAuth/userServices.service';
import { AppUsers, userSchema } from 'src/schema/users';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AppUsers.name, schema: userSchema }]),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
