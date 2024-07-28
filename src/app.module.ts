import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './modules/admin.module';
import { AuthModule } from './modules/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { EmailService } from './services/email/send-email.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://shahriyarmammadov:sehriyar4473@cluster0.7wfkmvc.mongodb.net/?retryWrites=true&w=majority',
    ),
    MulterModule.register({
      dest: './uploads',
    }),
    AdminModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
