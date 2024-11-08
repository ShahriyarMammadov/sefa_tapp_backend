import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
// import { LocalAuthGuard } from '../../local-auth.guard';
import { LoginDto } from '../../dto/login/login.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  // @Post('admin/login') // Admin login endpoint
  // @ApiTags('Auth')
  // @ApiOperation({ summary: 'Admin Login' })
  // @ApiResponse({ status: 201, description: 'Create access_token for admin' })
  // @ApiResponse({ status: 400, description: 'Bad Request' })
  // @ApiResponse({
  //   status: 404,
  //   description: 'Username or password is incorrect',
  // })
  // @ApiBody({ type: LoginDto })
  // async adminLogin(@Body() loginDto: LoginDto) {
  //   return this.authService.login(loginDto); // Admin login logic
  // }
  @Post('user/login') // User login endpoint
  @ApiTags('Auth')
  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({ status: 201, description: 'Create access_token for user' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({
    status: 404,
    description: 'Email/Phone or password is incorrect',
  })
  @ApiBody({ type: LoginDto })
  async userLogin(@Request() req, @Body() loginDto: LoginDto) {
    let ipAddress: string;

    const forwarded = req.headers['x-forwarded-for'];
    if (forwarded) {
      ipAddress = forwarded.split(',')[0].trim();
    } else {
      ipAddress = req.ip || req.connection.remoteAddress;
    }

    loginDto.ipAddress = ipAddress;

    return this.authService.loginUser(loginDto); // User login logic
  }
}
