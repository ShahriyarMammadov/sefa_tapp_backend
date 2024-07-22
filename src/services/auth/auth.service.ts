import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../../services/admin/admin.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../../dto/login/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async validateAdmin(username: string, pass: string): Promise<any> {
    const admin = await this.adminService.findOne(username);
    if (!admin) {
      throw new NotFoundException('username incorrect');
    }
    const isPasswordCorrect = await bcrypt.compare(pass, admin.password);
    if (!isPasswordCorrect) {
      throw new NotFoundException('password incorrect');
    }

    const { password, ...result } = admin;
    return result;
  }

  async login(loginDto: LoginDto) {
    const adminData = await this.validateAdmin(
      loginDto.username,
      loginDto.password,
    );

    const payload = { username: adminData.username, sub: adminData._id };
    const accessToken = this.jwtService.sign(payload);
    return {
      access_token: accessToken,
    };
  }
}
