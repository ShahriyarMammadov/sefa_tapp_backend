import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, reservationSchema } from 'src/schema/reservation';
import { RejectReserjJobService } from 'src/services/reservation/rejectReservJob.service';
import { EmailService } from 'src/services/email/send-email.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: Reservation.name, schema: reservationSchema },
    ]),
  ],
  providers: [RejectReserjJobService, EmailService],
})
export class RejectReservJobModule {}
