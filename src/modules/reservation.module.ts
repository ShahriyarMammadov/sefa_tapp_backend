import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationController } from 'src/controller/reservation/reservation.controller';
import { ReservationService } from 'src/services/reservation/reservation.service';
import { Reservation, reservationSchema } from 'src/schema/reservation';
import { AppUsers, userSchema } from 'src/schema/users';
import { Doctor, DoctorSchema } from 'src/schema/doctor';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: reservationSchema },
      { name: AppUsers.name, schema: userSchema },
      { name: Doctor.name, schema: DoctorSchema },
    ]),
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
  exports: [MongooseModule, ReservationService],
})
export class ReservationModule {}
