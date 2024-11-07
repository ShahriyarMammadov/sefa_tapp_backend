import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WishlistController } from 'src/controller/wishlist/wishlist.controller';
import { Wishlist, WishlistSchema } from 'src/schema/wishlist';
import { WishlistService } from 'src/services/wishlist/wishlist.service';
// import { AdminModule } from './admin.module';
import { MedicineModule } from './medicine.module';
import { ClinicsModule } from './clinics.module';
import { Medicine, MedicineSchema } from 'src/schema/medicine';
import { Clinics, ClinicsSchema } from 'src/schema/clinics';
import { AppUsers, userSchema } from 'src/schema/users';
import { PharmacyModule } from './pharmacy.module';
import { Pharmacy, PharmacySchema } from 'src/schema/pharmacy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Wishlist.name, schema: WishlistSchema },
      { name: AppUsers.name, schema: userSchema },
      { name: Medicine.name, schema: MedicineSchema },
      { name: Clinics.name, schema: ClinicsSchema },
      { name: Pharmacy.name, schema: PharmacySchema },
    ]),
    // AdminModule,
    MedicineModule,
    ClinicsModule,
    PharmacyModule,
  ],
  controllers: [WishlistController],
  providers: [WishlistService],
})
export class WishlistModule {}
