import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '../services/auth/auth.service';
import { JwtStrategy } from '../jwt.strategy';
import { LocalStrategy } from '../local.strategy';
// import { AdminModule } from './admin.module';
import { AuthController } from '../controller/auth/auth.controller';
import { EmailService } from 'src/services/email/send-email.service';
import { UsersModule } from './user.module';

@Module({
  imports: [
    // AdminModule,
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: 'NF_AZ_BACKEND_JWT_SECRET_KEY',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy, EmailService],
  exports: [AuthService],
})
export class AuthModule {}
