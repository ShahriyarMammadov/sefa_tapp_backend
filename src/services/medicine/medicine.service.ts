import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Medicine } from 'src/schema/medicine';
import { CreateMedicineDto } from 'src/dto/medicine/create-medicine.dto';
import { UpdateMedicineDto } from 'src/dto/medicine/update-medicine.dto';

@Injectable()
export class MedicineService {
  constructor(
    @InjectModel(Medicine.name) private readonly MedicineModel: Model<Medicine>,
  ) {}

  async create(CreateMedicineDto: CreateMedicineDto): Promise<Medicine> {
    const newMedicine = new this.MedicineModel(CreateMedicineDto);
    return newMedicine.save();
  }

  async findAll(): Promise<Medicine[]> {
    return this.MedicineModel.find().exec();
  }

  async findOne(id: string): Promise<Medicine> {
    const medicine = await this.MedicineModel.findById(id).exec();
    if (!medicine) {
      throw new NotFoundException(`Medicine with ID "${id}" not found`);
    }
    return medicine;
  }

  async update(
    id: string,
    UpdateMedicineDto: UpdateMedicineDto,
  ): Promise<Medicine> {
    const updateMedicine = await this.MedicineModel.findByIdAndUpdate(
      id,
      UpdateMedicineDto,
      { new: true },
    ).exec();
    if (!updateMedicine) {
      throw new NotFoundException(`Medicine with ID "${id}" not found`);
    }
    return updateMedicine;
  }

  async remove(id: string): Promise<void> {
    const result = await this.MedicineModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Medicine with ID "${id}" not found`);
    }
  }
}
