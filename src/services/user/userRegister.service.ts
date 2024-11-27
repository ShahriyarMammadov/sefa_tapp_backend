import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppUsers } from '../../schema/users';
import { Otp } from 'src/schema/otp';
import * as nodemailer from 'nodemailer';
import * as bcrypt from 'bcrypt';
import { Pharmacy } from 'src/schema/pharmacy';
import { CreateUserDto } from 'src/dto/users/create-user.dto';
import { UpdateUserDto } from 'src/dto/users/update-user-dto';
import { Request } from 'express';

interface Comment {
  comment: string;
  createdAt: Date;
}

export interface AppUserWithComments extends AppUsers {
  comments: Comment[];
}

@Injectable()
export class AppUserService {
  private transporter: nodemailer.Transporter;

  constructor(
    @InjectModel(AppUsers.name) private readonly appUserModel: Model<AppUsers>,
    @InjectModel(Otp.name) private readonly otpModel: Model<Otp>,
  ) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: 'info@sefatapp.com',
        pass: 'bw96bqyZ5e9M',
      },
    });
  }

  // Generate a random OTP code
  generateOTP(): string {
    return Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP
  }

  saltOrRounds: number = 10;

  // Hash password
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  // Send OTP email
  async sendOtpEmail(to: string, otp: string): Promise<void> {
    const mailOptions = {
      from: 'info@sefatapp.com',
      to,
      subject: 'Şəfa Tapp tətbiqinə xoş gəlmisiniz.',
      html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #4CAF50;">Şəfa Tapp tətbiqinə xoş gəlmisiniz!</h2>
        <p>Hörmətli istifadəçi,</p>
        <p>Tətbiqimizə giriş üçün təsdiq kodunuz aşağıdadır:</p>
        <div style="font-size: 24px; font-weight: bold; color: #4CAF50; padding: 10px; background-color: #f4f4f4; text-align: center; border-radius: 5px;">
          ${otp}
        </div>
        <p style="font-weight: bold;">Lütfən, bu kodu heç kimlə paylaşmayın.</p>
        <br>
        <img src="https://firebasestorage.googleapis.com/v0/b/elektra-az.appspot.com/o/images%2Fsefatapp.png?alt=media&token=9a6749e1-4e98-468f-a8f0-097bf43dd192" alt="Logo" style="width: 150px; height: auto;">
        <p>Əgər əlavə sualınız varsa, bizimlə əlaqə saxlamaqdan çəkinməyin.</p>
        <p style="font-weight: bold;>Ən xoş arzularla,<br>Şəfa Tapp Komandası</p>
      </div>
    `,
    };
    await this.transporter.sendMail(mailOptions);
  }

  // Send welcome email
  async sendWelcomeEmail(to: string): Promise<void> {
    const mailOptions = {
      from: 'info@sefatapp.com',
      to,
      subject: 'Şəfa Tapp Tətbiqinə Xoş Gəlmişsiniz!',
      html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #4CAF50;">Hörmətli istifadəçi, Şəfa Tapp Tətbiqinə Xoş Gəlmişsiniz!</h2>
        <p>Hesabınız uğurla aktiv edildi. Artıq tətbiqimizi tam olaraq istifadə edə bilərsiniz.</p>
        <p>Əgər əlavə sualınız varsa, bizimlə əlaqə saxlamaqdan çəkinməyin.</p>
        <br>
        <img src="https://firebasestorage.googleapis.com/v0/b/elektra-az.appspot.com/o/images%2Fsefatapp.png?alt=media&token=9a6749e1-4e98-468f-a8f0-097bf43dd192" alt="Logo" style="width: 150px; height: auto;">
        <p>Ən xoş arzularla,<br>Şəfa Tapp Komandası</p>
      </div>
    `,
    };
    await this.transporter.sendMail(mailOptions);
  }

  // Register user with OTP
  async registerUser(
    CreateUserDto: CreateUserDto,
    req: Request,
  ): Promise<AppUsers> {
    const ipAddress = req.ip;

    const existingUser = await this.appUserModel
      .findOne({ email: CreateUserDto.email })
      .exec();

    if (existingUser) {
      if (existingUser.isActive) {
        throw new BadRequestException(
          'A user with this email already exists and is active.',
        );
      } else {
        const otp = this.generateOTP();
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // OTP expires in 15 minutes

        await this.otpModel.findOneAndUpdate(
          {
            email: CreateUserDto.email,
            phoneNumber: CreateUserDto.phoneNumber,
          },
          { otpCode: otp, expiresAt },
          { upsert: true },
        );

        await this.sendOtpEmail(CreateUserDto.email, otp);
        return existingUser;
      }
    }

    const hashedPassword = await bcrypt.hash(
      CreateUserDto.password,
      this.saltOrRounds,
    );

    const otp = this.generateOTP();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // OTP expires in 15 minutes

    const newUser = new this.appUserModel({
      ...CreateUserDto,
      password: hashedPassword,
      repeatPassword: hashedPassword,
      otp,
      isActive: false,
      ipAddress: ipAddress,
    });

    await newUser.save();

    await this.otpModel.create({
      email: CreateUserDto.email,
      phoneNumber: CreateUserDto.phoneNumber,
      otpCode: otp,
      expiresAt,
    });

    await this.sendOtpEmail(CreateUserDto.email, otp);
    return newUser;
  }

  // Verify OTP
  async verifyOtp(
    email: string,
    phoneNumber: string,
    otp: string,
  ): Promise<boolean> {
    const otpRecord = await this.otpModel
      .findOne({
        email,
        phoneNumber,
        otpCode: otp,
        expiresAt: { $gte: new Date() },
      })
      .exec();

    if (!otpRecord) {
      throw new NotFoundException('Invalid OTP or OTP has expired.');
    }

    const user = await this.appUserModel.findOne({ email, phoneNumber }).exec();
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    // Update user as active
    user.isActive = true;
    await user.save();

    await this.sendWelcomeEmail(email);

    // Remove OTP record after successful verification
    await this.otpModel.deleteOne({ _id: otpRecord._id }).exec();

    return true;
  }

  async findAll(isActive: boolean | null): Promise<AppUsers[]> {
    if (isActive === null) {
      return this.appUserModel.find().exec();
    }
    return this.appUserModel
      .find({ isActive })
      .select('fullname email phoneNumber profileImageURL')
      .exec();
  }

  async findOne(id: string): Promise<AppUsers> {
    const user = await this.appUserModel
      .findById(id)
      .select('fullname email phoneNumber profileImageURL ipAddress')
      .exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, UpdateUserDto: UpdateUserDto): Promise<AppUsers> {
    const updatedUser = await this.appUserModel
      .findByIdAndUpdate(id, UpdateUserDto, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedUser;
  }

  async remove(id: string): Promise<AppUsers> {
    const deletedUser = await this.appUserModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return deletedUser;
  }
}
