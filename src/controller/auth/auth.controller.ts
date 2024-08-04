import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { LocalAuthGuard } from '../../local-auth.guard';
import { LoginDto } from '../../dto/login/login.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiTags('auth')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 201,
    description: 'create access_token',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({
    status: 404,
    description: 'username or password is incorrect',
  })
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
