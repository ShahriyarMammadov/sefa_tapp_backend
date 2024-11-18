import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Clinics } from 'src/schema/clinics';
import { Doctor } from 'src/schema/doctor';
import { Medicine } from 'src/schema/medicine';
import { Pharmacy } from 'src/schema/pharmacy';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Clinics.name) private readonly clinicsModel: Model<Clinics>,
    @InjectModel(Doctor.name) private readonly doctorModel: Model<Doctor>,
    @InjectModel(Medicine.name) private readonly medicineModel: Model<Medicine>,
    @InjectModel(Pharmacy.name) private readonly pharmacyModel: Model<Pharmacy>,
  ) {}

  async searchByName(name: string) {
    const results = [];

    const clinics = await this.clinicsModel
      .find({ name: { $regex: name, $options: 'i' } })
      .select(
        '_id name location rating imageURL createdAt',
      )
      .exec();
    if (clinics.length > 0) {
      results.push({ Clinics: clinics });
    }

    const doctors = await this.doctorModel
      .find({ name: { $regex: name, $options: 'i' } })
      .select(
        '_id name surname specialty hospitalName imageURL email location createdAt averageRating',
      )
      .exec();
    if (doctors.length > 0) {
      results.push({ Doctors: doctors });
    }

    const medicines = await this.medicineModel
      .find({ name: { $regex: name, $options: 'i' } })
      .select('_id name tablet rating imageURL price createdAt numberAvailable')
      .exec();
    if (medicines.length > 0) {
      results.push({ Medicines: medicines });
    }

    const pharmacies = await this.pharmacyModel
      .find({ name: { $regex: name, $options: 'i' } })
      .select(
        '_id name openHours location rating images about createdAt averageRating',
      )
      .exec();
    if (pharmacies.length > 0) {
      results.push({ Pharmacies: pharmacies });
    }

    return results;
  }
}
