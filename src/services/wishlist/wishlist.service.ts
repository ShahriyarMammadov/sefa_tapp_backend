import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Wishlist } from '../../schema/wishlist';
import { WishlistDto } from '../../dto/wishlist/create-wishlist.dto';
import { Admin } from '../../schema/admin';
import { Medicine } from '../../schema/medicine';
import { Clinics } from '../../schema/clinics';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(Wishlist.name) private readonly wishlistModel: Model<Wishlist>,
    @InjectModel(Admin.name) private readonly userModel: Model<Admin>,
    @InjectModel(Medicine.name) private readonly medicineModel: Model<Medicine>,
    @InjectModel(Clinics.name) private readonly clinicModel: Model<Clinics>,
  ) {}

  async createWishlist(wishlistDto: WishlistDto): Promise<Wishlist> {
    const { userID, medicineID, clinicID } = wishlistDto;

    // Validate if userID is a valid MongoDB ObjectId
    if (!isValidObjectId(userID)) {
      throw new BadRequestException(`Invalid user ID format.`);
    }

    // Check if user exists
    const user = await this.userModel.findById(userID);
    if (!user) {
      throw new NotFoundException(`User with ID ${userID} not found.`);
    }

    // Ensure at least one of medicineID or clinicID is provided
    if (!medicineID && !clinicID) {
      throw new BadRequestException(
        'Either medicineID or clinicID must be provided.',
      );
    }

    // Validate medicineID and clinicID
    if (medicineID) {
      if (!isValidObjectId(medicineID)) {
        throw new BadRequestException(`Invalid medicine ID format.`);
      }

      const medicineExists = await this.checkMedicineExists(medicineID);

      if (!medicineExists) {
        throw new NotFoundException(
          `Medicine with ID ${medicineID} not found.`,
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
      .populate('medicineID')
      .populate('clinicID')
      .exec();

    if (!wishlists || wishlists.length === 0) {
      throw new NotFoundException('Wishlist not found for the user');
    }

    return wishlists;
  }

  // Mock validation methods
  private async checkMedicineExists(medicineID: string): Promise<boolean> {
    const medicine = await this.medicineModel.findById(medicineID).exec();
    return !!medicine;
  }

  private async checkClinicExists(clinicID: string): Promise<boolean> {
    const clinic = await this.clinicModel.findById(clinicID).exec();
    return !!clinic;
  }
}
