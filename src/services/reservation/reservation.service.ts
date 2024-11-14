import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { ReservationDto } from 'src/dto/reservation.dto';
import { Reservation } from 'src/schema/reservation';
import { Doctor } from 'src/schema/doctor';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private readonly reservationModel: Model<Reservation>,
    @InjectModel(Doctor.name) private readonly doctorModel: Model<Doctor>,
  ) {}

  async createReservation(
    reservationDto: ReservationDto,
  ): Promise<Reservation> {
    const { doctorId, userId, reservationTime, services, paymentMethod } =
      reservationDto;

    if (!isValidObjectId(doctorId)) {
      throw new BadRequestException(`Invalid doctor ID format.`);
    }

    if (!isValidObjectId(userId)) {
      throw new BadRequestException(`Invalid user ID format.`);
    }

    if (paymentMethod !== 'CARD' && paymentMethod !== 'CASH') {
      throw new BadRequestException(`payment method should be CARD or CASH`);
    }

    const regex = /^\d{2}\.\d{2}\.\d{4}T\d{2}:\d{2} (AM|PM)$/;
    if (!regex.test(reservationTime)) {
      throw new BadRequestException(
        'Invalid reservation time format. It should be in the format DD.MM.YYYYTHH:mm AM/PM',
      );
    }

    // Find the doctor by ID
    const doctor = await this.doctorModel.findById(doctorId).exec();
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${doctorId} not found`);
    }

    // Parse the date and time from reservationTime (assuming it's in a format like "14.11.2024T14:30 AM")
    const [datePart, timePart] = reservationTime.split('T');
    const period = datePart;
    const slotTime = timePart;

    // Find the matching period and slot with status "available"
    const periodObj = doctor.availableTimes.find((p) => p.period === period);
    if (!periodObj) {
      throw new BadRequestException(
        `No available slots for the specified period: ${period}`,
      );
    }

    const slot = periodObj.slots.find(
      (s) => s.time === slotTime && s.status === 'available',
    );
    if (!slot) {
      throw new BadRequestException(`Selected slot is not available`);
    }

    // Update slot status to "reserved"
    slot.status = 'reserved';

    // Save the updated doctor data
    doctor.markModified('availableTimes');

    // Calculate the total price from the services array
    const totalPrice = services.reduce(
      (sum, service) => sum + (service.price || 0),
      0,
    );

    // Set the price field in the reservationDto to the calculated total price
    reservationDto.price = +totalPrice;

    await doctor.save();

    // Create the reservation
    const createdReservation = new this.reservationModel(reservationDto);
    return createdReservation.save();
  }

  async getAllReservations(): Promise<Reservation[]> {
    return this.reservationModel.find().exec();
  }

  async getReservationById(id: string): Promise<Reservation> {
    const reservation = await this.reservationModel
      .findById(id)
      .populate(
        'userId',
        '_id fullName email phoneNumber profileImageURL createdAt',
      )
      .populate(
        'doctorId',
        '_id name surname dateOfBirth imageURL createdAt specialty hospitalName email phoneNumber about',
      )
      .exec();

    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    return reservation;
  }

  async updateReservation(
    id: string,
    reservationDto: ReservationDto,
  ): Promise<Reservation> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format.`);
    }

    const updatedReservation = await this.reservationModel
      .findByIdAndUpdate(id, reservationDto, { new: true })
      .exec();
    if (!updatedReservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    return updatedReservation;
  }

  async rejectReserv(id: string): Promise<Reservation> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format.`);
    }

    const reservation = await this.reservationModel.findById(id).exec();
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }

    const doctorId = reservation.doctorId;
    const reservationTime = reservation.reservationTime;

    const doctor = await this.doctorModel.findById(doctorId).exec();
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${doctorId} not found`);
    }

    const [datePart, timePart] = reservationTime.split('T');
    const period = datePart;
    const slotTime = timePart;

    const periodObj = doctor.availableTimes.find((p) => p.period === period);
    if (periodObj) {
      const slot = periodObj.slots.find((s) => s.time === slotTime);
      if (slot) {
        slot.status = 'available';
        doctor.markModified('availableTimes');
      }
    }

    await doctor.save();

    reservation.isActive = false;
    await reservation.save();

    return reservation;
  }

  async deleteReservation(id: string): Promise<Reservation> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format.`);
    }

    const deletedReservation = await this.reservationModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedReservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    return deletedReservation;
  }
}
