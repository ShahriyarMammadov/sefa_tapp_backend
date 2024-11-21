import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation } from 'src/schema/reservation';
import { EmailService } from '../email/send-email.service';

@Injectable()
export class RejectReserjJobService {
  private readonly logger = new Logger(RejectReserjJobService.name);

  constructor(
    @InjectModel(Reservation.name)
    private readonly reservationModel: Model<Reservation>,
    private readonly emailService: EmailService,
  ) {}

  // 00:00
  @Cron('2 0 * * *')
  async rejectReservJob() {
    const now = new Date();

    const reservationUpdateResult = await this.reservationModel.updateMany(
      {
        reservationTime: { $lt: new Date(now.toISOString()) },
        isActive: true,
      },
      { $set: { isActive: false } },
    );

    await this.emailService.sendEmail(
      'shahriyarmammadov16@gmail.com',
      'Reservation Job Result',
      `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #4CAF50;">Deleted Reservation Count: </h2>
          
          <div style="font-size: 24px; font-weight: bold; color: #4CAF50; padding: 10px; background-color: #f4f4f4; text-align: center; border-radius: 5px;">
            ${reservationUpdateResult.modifiedCount}
          </div>
        </div>
        `,
    );

    this.logger.log(
      `Updated ${reservationUpdateResult.modifiedCount} reservations to inactive.`,
    );
  }
}
