import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Pharmacy } from 'src/schema/pharmacy';
import {
  CommentDto,
  CreatePharmacyDto,
} from 'src/dto/pharmacy/create-pharmacy.dto';
import { AppUsers } from 'src/schema/appRegister';

@Injectable()
export class PharmacyService {
  constructor(
    @InjectModel(Pharmacy.name) private readonly PharmacyModel: Model<Pharmacy>,
    @InjectModel(AppUsers.name) private userModel: Model<AppUsers>,
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

  async addComment(id: string, commentDto: CommentDto): Promise<Pharmacy> {
    const pharmacy = await this.PharmacyModel.findById(id);
    if (!pharmacy) {
      throw new NotFoundException(`Pharmacy with ID ${id} not found`);
    }

    const user = await this.userModel.findById(commentDto.userId);
    if (!user) {
      throw new NotFoundException(
        `User with ID ${commentDto.userId} not found`,
      );
    }

    const newComment = {
      userId: commentDto.userId,
      comment: commentDto.comment,
      date: new Date(),
    };

    if (!pharmacy.comments) {
      pharmacy.comments = [];
    }

    pharmacy.comments.push(newComment);
    return pharmacy.save();
  }
}
