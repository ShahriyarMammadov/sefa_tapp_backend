import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Wishlist } from '../../schema/wishlist';
import { WishlistDto } from '../../dto/wishlist/create-wishlist.dto';
import { Medicine } from '../../schema/medicine';
import { Clinics } from '../../schema/clinics';
import { AppUsers } from 'src/schema/appRegister';
import { Pharmacy } from 'src/schema/pharmacy';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(Wishlist.name) private readonly wishlistModel: Model<Wishlist>,
    @InjectModel(AppUsers.name) private readonly userModel: Model<AppUsers>,
    @InjectModel(Medicine.name) private readonly medicineModel: Model<Medicine>,
    @InjectModel(Clinics.name) private readonly clinicModel: Model<Clinics>,
    @InjectModel(Pharmacy.name) private readonly pharmacyModel: Model<Pharmacy>,
  ) {}

  async createWishlist(wishlistDto: WishlistDto): Promise<Wishlist> {
    const { userID, medicineID, clinicID, pharmacyID } = wishlistDto;

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
    if (!medicineID && !clinicID && !pharmacyID) {
      throw new BadRequestException(
        'Either medicineID, clinicID or pharmacyID must be provided.',
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
      .populate('medicineID')
      .populate('clinicID')
      .populate('pharmacyID')
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
  private async checkMedicineExists(medicineID: string): Promise<boolean> {
    const medicine = await this.medicineModel.findById(medicineID).exec();
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
