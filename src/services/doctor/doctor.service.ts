import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Doctor } from '../../schema/doctor';
import { CreateDoctorDto } from '../../dto/doctor/create-doctor.dto';
import { UpdateDoctorDto } from 'src/dto/doctor/update-doctor.dto';
import { Comments } from 'src/schema/comments';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor.name) private readonly doctorModel: Model<Doctor>,
    @InjectModel(Comments.name) private readonly commentModel: Model<Comments>,
  ) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const newDoctor = new this.doctorModel(createDoctorDto);
    return newDoctor.save();
  }

  async findAll(): Promise<Doctor[]> {
    const doctors = await this.doctorModel
      .find()
      .select('name surname hospitalName _id imageURL specialty')
      .exec();

    for (const doctor of doctors) {
      doctor['averageRating'] = await this.calculateAverageRating(
        doctor._id.toString(),
      );
    }

    return doctors;
  }

  async findOne(id: string): Promise<Doctor> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format.`);
    }

    const doctor = await this.doctorModel.findById(id).exec();

    if (!doctor) {
      throw new NotFoundException(`Doctor with ID "${id}" not found`);
    }

    doctor['averageRating'] = await this.calculateAverageRating(id);

    return doctor;
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format.`);
    }

    const updatedDoctor = await this.doctorModel
      .findByIdAndUpdate(id, updateDoctorDto, { new: true })
      .exec();
    if (!updatedDoctor) {
      throw new NotFoundException(`Doctor with ID "${id}" not found`);
    }
    return updatedDoctor;
  }

  async remove(id: string): Promise<void> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format.`);
    }

    const result = await this.doctorModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Doctor with ID "${id}" not found`);
    }
  }

  async calculateAverageRating(doctorId: string): Promise<number> {
    const comments = await this.commentModel.find({ doctor: doctorId }).exec();

    if (comments.length === 0) {
      return 0;
    }

    const totalRating = comments.reduce(
      (sum, comment) => sum + comment.rating,
      0,
    );
    const averageRating = totalRating / comments.length;

    return parseFloat(averageRating.toFixed(2));
  }
}
