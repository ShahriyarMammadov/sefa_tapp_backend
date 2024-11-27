import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Pharmacy } from 'src/schema/pharmacy';
import { CreatePharmacyDto } from 'src/dto/pharmacy/create-pharmacy.dto';
import { PharmacyProducts } from 'src/schema/pharmacyProducts';

@Injectable()
export class PharmacyService {
  constructor(
    @InjectModel(Pharmacy.name) private readonly PharmacyModel: Model<Pharmacy>,
    @InjectModel(PharmacyProducts.name)
    private readonly PharmacyProductModel: Model<PharmacyProducts>,
  ) {}

  async create(CreatePharmacyDto: CreatePharmacyDto): Promise<Pharmacy> {
    const newPharmacy = new this.PharmacyModel(CreatePharmacyDto);
    return newPharmacy.save();
  }

  async findAll(): Promise<Pharmacy[]> {
    return this.PharmacyModel.find().exec();
  }

  async findOne(id: string): Promise<Pharmacy> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format.`);
    }

    const pharmacy = await this.PharmacyModel.findById(id).exec();
    if (!pharmacy) {
      throw new NotFoundException(`Pharmacy with ID "${id}" not found`);
    }

    return pharmacy;
  }

  async getProductsByPharmacyId(
    pharmacyId: string,
  ): Promise<PharmacyProducts[]> {
    if (!isValidObjectId(pharmacyId)) {
      throw new BadRequestException(`Invalid Pharmacy ID format.`);
    }

    const pharmacyExists = await this.PharmacyModel.findById(pharmacyId)
      .select(
        '_id name numberAvailable averageRating price about images createdAt',
      )
      .exec();
      
    if (!pharmacyExists) {
      throw new NotFoundException(
        `Pharmacy with ID "${pharmacyId}" not found.`,
      );
    }

    const products = await this.PharmacyProductModel.find({ pharmacyId })
      .select('-__v')
      .exec();

    if (!products.length) {
      throw new NotFoundException(
        `No products found for Pharmacy ID "${pharmacyId}".`,
      );
    }

    return products;
  }

  async update(
    id: string,
    CreatePharmacyDto: CreatePharmacyDto,
  ): Promise<Pharmacy> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format.`);
    }

    const updatePharmacy = await this.PharmacyModel.findByIdAndUpdate(
      id,
      CreatePharmacyDto,
      { new: true },
    ).exec();
    if (!updatePharmacy) {
      throw new NotFoundException(`Pharmacy with ID "${id}" not found`);
    }
    return updatePharmacy;
  }

  async remove(id: string): Promise<void> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format.`);
    }

    const result = await this.PharmacyModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Pharmacy with ID "${id}" not found`);
    }
  }
}
