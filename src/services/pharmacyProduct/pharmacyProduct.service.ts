import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePharmacyProductDto } from 'src/dto/pharmacyProduct.dto';
import { Comments } from 'src/schema/comments';
import { Pharmacy } from 'src/schema/pharmacy';
import { PharmacyProducts } from 'src/schema/pharmacyProducts';

@Injectable()
export class PharmacyProductsService {
  constructor(
    @InjectModel(PharmacyProducts.name)
    private readonly pharmacyProductsModel: Model<PharmacyProducts>,
    @InjectModel(Pharmacy.name)
    private readonly pharmacyModel: Model<Pharmacy>,
    @InjectModel(Comments.name)
    private readonly CommentsModel: Model<Comments>,
  ) {}

  async create(
    createPharmacyProductDto: CreatePharmacyProductDto,
  ): Promise<PharmacyProducts> {
    const { pharmacyId } = createPharmacyProductDto;

    if (!isValidObjectId(pharmacyId)) {
      throw new BadRequestException(`Invalid Pharmacy ID format.`);
    }

    const pharmacyExists = await this.pharmacyModel.findById(pharmacyId).exec();
    if (!pharmacyExists) {
      throw new NotFoundException(`Pharmacy with ID ${pharmacyId} not found.`);
    }

    const createdProduct = new this.pharmacyProductsModel(
      createPharmacyProductDto,
    );
    return createdProduct.save();
  }

  async findAll(): Promise<any[]> {
    const products = await this.pharmacyProductsModel
      .find()
      .populate({
        path: 'pharmacyId',
        select: 'openHours name images createdAt rating',
      })
      .select('_id numberAvailable averageRating images price createdAt')
      .exec();

    const result = await Promise.all(
      products.map(async (product) => {
        const comments = await this.CommentsModel.find({
          pharmacyProduct: product._id,
        })
          .select('_id comment rating')
          .exec();

        const averageRating =
          comments.reduce((sum, comment) => sum + (comment.rating || 0), 0) /
          (comments.length || 1);

        product.averageRating = +averageRating.toFixed(1) || 0;

        await product.save();

        return {
          ...product.toObject(),
          comments,
        };
      }),
    );

    return result;
  }

  async findOne(id: string): Promise<any> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format.`);
    }

    const product = await this.pharmacyProductsModel
      .findById(id)
      .populate({
        path: 'pharmacyId',
        select: 'openHours name images createdAt rating',
      })
      .exec();

    if (!product) {
      throw new NotFoundException(`Pharmacy product with ID ${id} not found.`);
    }

    const comments = await this.CommentsModel.find({
      pharmacyProduct: id,
    })
      .select('_id user comment rating createdAt')
      .populate({
        path: 'user',
        select: 'fullName email profileImageUrl',
      })
      .exec();

    const averageRating =
      comments.reduce((sum, comment) => sum + (comment.rating || 0), 0) /
      (comments.length || 1);

    product.averageRating = averageRating || 0;

    await product.save();

    return {
      ...product.toObject(),
      comments,
    };
  }

  async update(
    id: string,
    updateData: Partial<CreatePharmacyProductDto>,
  ): Promise<PharmacyProducts> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format.`);
    }

    const updatedProduct = await this.pharmacyProductsModel
      .findByIdAndUpdate(id, updateData, {
        new: true,
      })
      .exec();

    if (!updatedProduct) {
      throw new NotFoundException(`Pharmacy product with ID ${id} not found`);
    }

    return updatedProduct;
  }

  async remove(id: string): Promise<void> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format.`);
    }

    const result = await this.pharmacyProductsModel
      .findByIdAndDelete(id)
      .exec();

    if (!result) {
      throw new NotFoundException(`Pharmacy product with ID ${id} not found`);
    }
  }
}
