import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '../services/auth/auth.service';
import { JwtStrategy } from '../jwt.strategy';
import { LocalStrategy } from '../local.strategy';
import { AdminModule } from './admin.module';
import { AuthController } from '../controller/auth/auth.controller';

@Module({
  imports: [
    AdminModule,
    PassportModule,
    JwtModule.register({
      secret: 'NF_AZ_BACKEND_JWT_SECRET_KEY',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
