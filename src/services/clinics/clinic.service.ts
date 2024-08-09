import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Clinics } from '../../schema/clinics';
import { CreateClinicsDto } from '../../dto/clinics/create-clinic.dto';
import { UpdateClinicsDto } from 'src/dto/clinics/update-clinic.dto';

@Injectable()
export class ClinicsService {
  constructor(
    @InjectModel(Clinics.name) private readonly clinicsModel: Model<Clinics>,
  ) {}

  async create(createClinicsDto: CreateClinicsDto): Promise<Clinics> {
    const newClinic = new this.clinicsModel(createClinicsDto);
    return newClinic.save();
  }

  async findAll(): Promise<Clinics[]> {
    return this.clinicsModel.find().exec();
  }

  async findOne(id: string): Promise<Clinics> {
    const clinic = await this.clinicsModel.findById(id).exec();
    if (!clinic) {
      throw new NotFoundException(`Clinic with ID "${id}" not found`);
    }
    return clinic;
  }

  async update(
    id: string,
    updateClinicsDto: UpdateClinicsDto,
  ): Promise<Clinics> {
    const updatedClinic = await this.clinicsModel
      .findByIdAndUpdate(id, updateClinicsDto, { new: true })
      .exec();
    if (!updatedClinic) {
      throw new NotFoundException(`Clinic with ID "${id}" not found`);
    }
    return updatedClinic;
  }

  async remove(id: string): Promise<void> {
    const result = await this.clinicsModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Clinic with ID "${id}" not found`);
    }
  }
}
