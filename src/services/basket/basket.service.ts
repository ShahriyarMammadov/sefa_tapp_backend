// import {
//   Injectable,
//   NotFoundException,
//   BadRequestException,
// } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { isValidObjectId, Model } from 'mongoose';
// import { Wishlist } from '../../schema/wishlist';
// import { WishlistDto } from '../../dto/wishlist/create-wishlist.dto';
// import { AppUsers } from 'src/schema/users';
// import { Pharmacy } from 'src/schema/pharmacy';

// @Injectable()
// export class BasketService {
//   constructor(
//     @InjectModel(AppUsers.name) private readonly userModel: Model<AppUsers>,
//     @InjectModel(Pharmacy.name) private readonly pharmacyModel: Model<Pharmacy>,
//   ) {}

//   async createBasket(BasketDto: createBa): Promise<Wishlist> {
//     const { userID, medicineID, clinicID, pharmacyID } = wishlistDto;

//     // Validate if userID is a valid MongoDB ObjectId
//     if (!isValidObjectId(userID)) {
//       throw new BadRequestException(`Invalid user ID format.`);
//     }

//     // Check if user exists
//     const user = await this.userModel.findById(userID);

//     if (!user) {
//       throw new NotFoundException(`User with ID ${userID} not found.`);
//     }

//     if (!user?.isActive) {
//       throw new BadRequestException(`User is not active.`);
//     }

//     // Ensure at least one of medicineID or clinicID is provided

//     if (pharmacyID) {
//       if (!isValidObjectId(pharmacyID)) {
//         throw new BadRequestException(`Invalid Pharmacy ID format.`);
//       }

//       const pharmacyExists = await this.checkPharmacyExists(pharmacyID);

//       if (!pharmacyExists) {
//         throw new NotFoundException(
//           `Pharmacy with ID ${pharmacyID} not found.`,
//         );
//       }
//     }
//   }

//   private async checkPharmacyExists(pharmacyID: string): Promise<boolean> {
//     const clinic = await this.pharmacyModel.findById(pharmacyID).exec();
//     return !!clinic;
//   }
// }
