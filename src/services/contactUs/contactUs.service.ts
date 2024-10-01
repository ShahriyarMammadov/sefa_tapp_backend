import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateContactUsDto } from 'src/dto/contactUs/create-contactUs.dto';
import { ContactUs } from 'src/schema/contactUs';

@Injectable()
export class ContactUsService {
  constructor(
    @InjectModel(ContactUs.name)
    private readonly ContactUsModel: Model<ContactUs>,
  ) {}

  async create(createContactUsDto: CreateContactUsDto): Promise<ContactUs> {
    const contact = new this.ContactUsModel(createContactUsDto);
    return contact.save();
  }

  findAll(): Promise<ContactUs[]> {
    return this.ContactUsModel.find();
  }

  async findOne(id: string): Promise<ContactUs> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format.`);
    }

    const contact = await this.ContactUsModel.findById(id).exec();
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    return contact;
  }

  async remove(id: string): Promise<ContactUs> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format.`);
    }

    const result = await this.ContactUsModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Contact with ID "${id}" not found`);
    }

    const remainingContacts: any = await this.ContactUsModel.find().exec();

    return remainingContacts;
  }
}
