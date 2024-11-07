import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { AdminService } from '../../services/admin/admin.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../../dto/login/login.dto';
import { UserService } from '../userAuth/userServices.service';
import { EmailService } from '../email/send-email.service';

@Injectable()
export class AuthService {
  constructor(
    // private readonly adminService: AdminService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  // async validateAdmin(username: string, pass: string): Promise<any> {
  //   const admin = await this.adminService.findOne(username);
  //   if (!admin) {
  //     throw new NotFoundException('username incorrect');
  //   }
  //   const isPasswordCorrect = await bcrypt.compare(pass, admin.password);
  //   if (!isPasswordCorrect) {
  //     throw new NotFoundException('password incorrect');
  //   }

  //   const { password, ...result } = admin;
  //   return result;
  // }

  private async validateUser(loginDto: LoginDto): Promise<any> {
    const { email, phoneNumber, password, ipAddress } = loginDto;
    let user: any;

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
        'Fərqli IP Ünvanından Yeni Giriş Aşkarlanıb',
        `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #4CAF50;">Fərqli İP ünvanı</h2>
          <p>Hörmətli istifadəçi,</p>
          <p>Hesabınıza fərqli bir IP ünvanından giriş aşkarlanıb:</p>
          <div style="font-size: 24px; font-weight: bold; color: #4CAF50; padding: 10px; background-color: #f4f4f4; text-align: center; border-radius: 5px;">
            ${ipAddress}
          </div>
          <p>Əgər bu girişi siz etməmisinizsə, hesabınızı qorumaq üçün şifrənizi dəyişməyiniz tövsiyə olunur.</p>
          <br>
          <img src="https://firebasestorage.googleapis.com/v0/b/elektra-az.appspot.com/o/images%2Fsefatapp.png?alt=media&token=9a6749e1-4e98-468f-a8f0-097bf43dd192" alt="Logo" style="width: 150px; height: auto;">
          <p>Əlavə suallarınız varsa, bizimlə əlaqə saxlamaqdan çəkinməyin.</p>
          <p>Ən xoş arzularla,<br>Şəfa Tapp Komandası</p>
        </div>
        `,
      );
    }

    user = user.toObject();

    const { password: _, ...result } = user;
    return result;
  }

  // async login(loginDto: LoginDto) {
  //   const adminData = await this.validateAdmin(
  //     loginDto.username,
  //     loginDto.password,
  //   );

  //   const payload = { username: adminData.username, sub: adminData._id };
  //   const accessToken = this.jwtService.sign(payload);

  //   return {
  //     access_token: accessToken,
  //   };
  // }

  async loginUser(loginDto: LoginDto) {
    const userData = await this.validateUser(loginDto);
    const payload = { username: userData.username, sub: userData._id };
    const accessToken = this.jwtService.sign(payload);
    return {
      access_token: accessToken,
      id: userData._id,
      fullName: userData.fullName,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      profileImageUrl:
        userData.profileImageURL ||
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    };
  }
}
