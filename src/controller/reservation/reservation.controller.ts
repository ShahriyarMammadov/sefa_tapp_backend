import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReservationDto } from 'src/dto/reservation.dto';
import { Reservation } from 'src/schema/reservation';
import { ReservationService } from 'src/services/reservation/reservation.service';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a reservation' })
  @ApiResponse({
    status: 201,
    description: 'The reservation has been successfully created.',
  })
  async create(@Body() reservationDto: ReservationDto): Promise<Reservation> {
    return this.reservationService.createReservation(reservationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get reservation by ID' })
  @ApiResponse({
    status: 200,
    description: 'The reservation record has been successfully retrieved.',
  })
  async findById(@Param('id') id: string): Promise<Reservation> {
    const reservation = await this.reservationService.getReservationById(id);
    if (!reservation) {
      throw new HttpException('Reservation not found', HttpStatus.NOT_FOUND);
    }
    return reservation;
  }

  @Get()
  @ApiOperation({ summary: 'Get all reservations' })
  @ApiResponse({
    status: 200,
    description: 'List of reservations retrieved successfully.',
  })
  async findAll(): Promise<Reservation[]> {
    return this.reservationService.getAllReservations();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update reservation by ID' })
  @ApiResponse({
    status: 200,
    description: 'The reservation has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() reservationDto: ReservationDto,
  ): Promise<Reservation> {
    return this.reservationService.updateReservation(id, reservationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete reservation by ID' })
  @ApiResponse({
    status: 200,
    description: 'The reservation has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<Reservation> {
    return this.reservationService.deleteReservation(id);
  }
}
