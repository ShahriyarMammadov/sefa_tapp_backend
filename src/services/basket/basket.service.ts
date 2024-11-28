import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { isValidObjectId, Model } from 'mongoose';
import { CreateBasketDto } from 'src/dto/basket.dto';
import { Basket } from 'src/schema/basket';
import { PharmacyProducts } from 'src/schema/pharmacyProducts';
import { AppUsers } from 'src/schema/users';

@Injectable()
export class BasketService {
  constructor(
    @InjectModel(AppUsers.name) private readonly userModel: Model<AppUsers>,
    @InjectModel(Basket.name) private readonly basketModel: Model<Basket>,
    @InjectModel(PharmacyProducts.name)
    private readonly PharmacyProductsModel: Model<PharmacyProducts>,
  ) {}

  async createBasket(BasketDto: CreateBasketDto): Promise<Basket> {
    const { userId, pharmacyProductId } = BasketDto;

    if (!isValidObjectId(userId)) {
      throw new BadRequestException(`Invalid user id format.`);
    }

    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException(`User with ID /${userId}/ not found.`);
    }

    if (!user?.isActive) {
      throw new BadRequestException(`User is not active.`);
    }

    if (pharmacyProductId) {
      if (!isValidObjectId(pharmacyProductId)) {
        throw new BadRequestException(`Invalid Pharmacy ID format.`);
      }

      const pharmacyExists = await this.checkPharmacyExists(pharmacyProductId);

      if (!pharmacyExists) {
        throw new NotFoundException(
          `Pharmacy with ID /${pharmacyProductId}/ not found.`,
        );
      }

      const basketExists = await this.existBasketCheck(
        userId,
        pharmacyProductId,
      );
      if (basketExists) {
        throw new BadRequestException(
          `The product is already in the basket for the user.`,
        );
      }
    }

    const newBasket = new this.basketModel(BasketDto);
    return newBasket.save();
  }

  async getBasketByUserId(userId: string): Promise<Basket[]> {
    if (!isValidObjectId(userId)) {
      throw new BadRequestException(`Invalid user id format.`);
    }

    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const basket = await this.basketModel
      .find({ userId: new mongoose.Types.ObjectId(userId) })
      .populate({
        path: 'pharmacyProductId',
        select: '_id name numberAvailable averageRating price images',
      })
      .select('pharmacyProductId _id createdAt')
      .exec();

    return basket;
  }

  async deleteBasket(basketId: string): Promise<{ message: string }> {
    if (!isValidObjectId(basketId)) {
      throw new BadRequestException(`Invalid basket ID format.`);
    }

    const deletedBasket = await this.basketModel
      .findByIdAndDelete(basketId)
      .exec();

    if (!deletedBasket) {
      throw new NotFoundException(`Basket with ID "${basketId}" not found.`);
    }

    return {
      message: `Basket with ID "${basketId}" has been successfully deleted.`,
    };
  }

  private async checkPharmacyExists(pharmacyId: string): Promise<boolean> {
    const pharmacy =
      await this.PharmacyProductsModel.findById(pharmacyId).exec();
    return !!pharmacy;
  }

  private async existBasketCheck(
    userId: string,
    pharmacyProductId: string,
  ): Promise<boolean> {
    const basket = await this.basketModel.findOne({
      userId: new mongoose.Types.ObjectId(userId),
      pharmacyProductId: new mongoose.Types.ObjectId(pharmacyProductId),
    });
    return !!basket;
  }
}
