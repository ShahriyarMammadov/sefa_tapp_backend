import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Clinics } from 'src/schema/clinics';
import { Doctor } from 'src/schema/doctor';
// import { Medicine } from 'src/schema/medicine';
import { Pharmacy } from 'src/schema/pharmacy';
import { PharmacyProducts } from 'src/schema/pharmacyProducts';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Clinics.name) private readonly clinicsModel: Model<Clinics>,
    @InjectModel(Doctor.name) private readonly doctorModel: Model<Doctor>,
    @InjectModel(PharmacyProducts.name)
    private readonly pharmacyProductModel: Model<PharmacyProducts>,
    @InjectModel(Pharmacy.name) private readonly pharmacyModel: Model<Pharmacy>,
  ) {}

  async searchByName(name: string) {
    const results = [];

    const clinics = await this.clinicsModel
      .find({ name: { $regex: name, $options: 'i' } })
      .select('_id name location rating imageURL createdAt')
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

    const pharmacyProducts = await this.pharmacyProductModel
      .find({ name: { $regex: name, $options: 'i' } })
      .populate({
        path: 'pharmacyId',
        select: '_id openHours name location rating'
      })
      .select('_id name pharmacyId numberAvailable averageRating price images')
      .exec();

    if (pharmacyProducts.length > 0) {
      results.push({ PharmacyProducts: pharmacyProducts });
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
