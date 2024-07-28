import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { LocalAuthGuard } from '../../local-auth.guard';
import { LoginDto } from '../../dto/login/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
