import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Wishlist } from '../../schema/wishlist';
import { WishlistDto } from '../../dto/wishlist/create-wishlist.dto';
import { Clinics } from '../../schema/clinics';
import { AppUsers } from 'src/schema/users';
import { Pharmacy } from 'src/schema/pharmacy';
import { PharmacyProducts } from 'src/schema/pharmacyProducts';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(Wishlist.name) private readonly wishlistModel: Model<Wishlist>,
    @InjectModel(AppUsers.name) private readonly userModel: Model<AppUsers>,
    @InjectModel(Clinics.name) private readonly clinicModel: Model<Clinics>,
    @InjectModel(Pharmacy.name) private readonly pharmacyModel: Model<Pharmacy>,
    @InjectModel(PharmacyProducts.name)
    private readonly pharmacyProductsModel: Model<PharmacyProducts>,
  ) {}

  async createWishlist(wishlistDto: WishlistDto): Promise<Wishlist> {
    const { userID, pharmacyProductId, clinicID, pharmacyID } = wishlistDto;

    // Validate if userID is a valid MongoDB ObjectId
    if (!isValidObjectId(userID)) {
      throw new BadRequestException(`Invalid user ID format.`);
    }

    // Check if user exists
    const user = await this.userModel.findById(userID);

    if (!user) {
      throw new NotFoundException(`User with ID ${userID} not found.`);
    }

    if (!user?.isActive) {
      throw new BadRequestException(`User is not active.`);
    }

    // Ensure at least one of medicineID or clinicID is provided
    if (!pharmacyProductId && !clinicID && !pharmacyID) {
      throw new BadRequestException(
        'Either pharmacyProductId, clinicID or pharmacyID must be provided.',
      );
    }

    if (pharmacyProductId) {
      if (!isValidObjectId(pharmacyProductId)) {
        throw new BadRequestException(`Invalid pharmacy product ID format.`);
      }

      const pharmacyProductExists =
        await this.checkPharmacyProductsExists(pharmacyProductId);

      if (!pharmacyProductExists) {
        throw new NotFoundException(
          `Pharmacy product with ID ${pharmacyProductId} not found.`,
        );
      }
    }

    if (clinicID) {
      if (!isValidObjectId(clinicID)) {
        throw new BadRequestException(`Invalid clinic ID format.`);
      }

      const clinicExists = await this.checkClinicExists(clinicID);

      if (!clinicExists) {
        throw new NotFoundException(`Clinic with ID ${clinicID} not found.`);
      }
    }

    if (pharmacyID) {
      if (!isValidObjectId(pharmacyID)) {
        throw new BadRequestException(`Invalid Pharmacy ID format.`);
      }

      const pharmacyExists = await this.checkPharmacyExists(pharmacyID);

      if (!pharmacyExists) {
        throw new NotFoundException(
          `Pharmacy with ID ${pharmacyID} not found.`,
        );
      }
    }

    // Create and save the wishlist
    const wishlist = new this.wishlistModel(wishlistDto);
    return wishlist.save();
  }

  async findWishlistByUser(userID: string): Promise<Wishlist[]> {
    if (!isValidObjectId(userID)) {
      throw new BadRequestException(`Invalid user ID format.`);
    }

    const wishlists = await this.wishlistModel
      .find({ userID: userID })
      .populate({
        path: 'pharmacyProductId',
        select:
          '_id name numberAvailable averageRating price images pharmacyId',
        populate: {
          path: 'pharmacyId',
          select: '_id openHours name location rating images',
        },
      })
      .populate({
        path: 'clinicID',
        select: '_id name location rating imageURL',
      })
      .populate({
        path: 'pharmacyID',
        select: '_id openHours name location rating images',
      })
      .select('-__v -userID')
      .exec();

    if (!wishlists || wishlists.length === 0) {
      throw new NotFoundException('Wishlist not found for the user');
    }

    return wishlists;
  }

  async deleteWishlistById(id: string): Promise<{ message: string }> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid wishlist ID format.`);
    }

    const result = await this.wishlistModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException(`Wishlist with ID ${id} not found.`);
    }

    return { message: `Wishlist with ID ${id} has been successfully deleted.` };
  }

  // Mock validation methods
  private async checkPharmacyProductsExists(
    pharmacyProductId: string,
  ): Promise<boolean> {
    const medicine = await this.pharmacyProductsModel
      .findById(pharmacyProductId)
      .exec();
    return !!medicine;
  }

  private async checkClinicExists(clinicID: string): Promise<boolean> {
    const clinic = await this.clinicModel.findById(clinicID).exec();
    return !!clinic;
  }

  private async checkPharmacyExists(pharmacyID: string): Promise<boolean> {
    const clinic = await this.pharmacyModel.findById(pharmacyID).exec();
    return !!clinic;
  }
}
