import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor } from '../../schema/doctor';
import { CreateDoctorDto } from '../../dto/doctor/create-doctor.dto';
import { UpdateDoctorDto } from 'src/dto/doctor/update-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor.name) private readonly doctorModel: Model<Doctor>,
  ) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const newDoctor = new this.doctorModel(createDoctorDto);
    return newDoctor.save();
  }

  async findAll(): Promise<Doctor[]> {
    return this.doctorModel
      .find()
      .select('name surname hospitalName _id rating imageURL specialty')
      .exec();
  }

  async findOne(id: string): Promise<Doctor> {
    const doctor = await this.doctorModel.findById(id).exec();
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID "${id}" not found`);
    }
    return doctor;
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    const updatedDoctor = await this.doctorModel
      .findByIdAndUpdate(id, updateDoctorDto, { new: true })
      .exec();
    if (!updatedDoctor) {
      throw new NotFoundException(`Doctor with ID "${id}" not found`);
    }
    return updatedDoctor;
  }

  async remove(id: string): Promise<void> {
    const result = await this.doctorModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Doctor with ID "${id}" not found`);
    }
  }
}
