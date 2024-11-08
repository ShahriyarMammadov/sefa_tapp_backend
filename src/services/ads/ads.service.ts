import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateAdsDto } from 'src/dto/ads.dto';
import { Ads } from 'src/schema/ads';

@Injectable()
export class AdsService {
  constructor(@InjectModel(Ads.name) private AdsModel: Model<Ads>) {}

  async create(createAdsDto: CreateAdsDto): Promise<Ads> {
    const newAds = new this.AdsModel(createAdsDto);
    return newAds.save();
  }

  async findByCategory(category?: string): Promise<Ads[]> {
    const filter = category ? { category } : {};
    return this.AdsModel.find(filter).exec();
  }

  async remove(id: string): Promise<Ads> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format.`);
    }

    const deletedAds = await this.AdsModel.findByIdAndDelete(id).exec();
    if (!deletedAds) {
      throw new NotFoundException(`ADS with ID /${id}/ not found`);
    }

    return deletedAds;
  }
}
