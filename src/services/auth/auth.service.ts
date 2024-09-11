import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../../services/admin/admin.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../../dto/login/login.dto';
import { UserService } from '../userAuth/userServices.service';
import { EmailService } from '../email/send-email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
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

  private async validateUser(loginDto: LoginDto): Promise<any> {
    const { email, phoneNumber, password, ipAddress } = loginDto;
    let user;

    if (email) {
      user = await this.userService.findByEmail(email);
    } else if (phoneNumber) {
      user = await this.userService.findByPhoneNumber(phoneNumber);
    } else {
      throw new NotFoundException('Email or phone number is required');
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new NotFoundException('Password incorrect');
    }

    if (user.ipAddress !== ipAddress) {
      await this.emailService.sendEmail(
        user.email,
        'New Login Detected from Different IP Address',
        `${ipAddress}`,
      );
    }

    const { password: _, ...result } = user;
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

  async loginUser(loginDto: LoginDto) {
    const userData = await this.validateUser(loginDto);
    const payload = { username: userData.username, sub: userData._id };
    const accessToken = this.jwtService.sign(payload);
    return { access_token: accessToken };
  }
}
