import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WishlistController } from 'src/controller/wishlist/wishlist.controller';
import { Wishlist, WishlistSchema } from 'src/schema/wishlist';
import { WishlistService } from 'src/services/wishlist/wishlist.service';
import { AdminModule } from './admin.module';
import { MedicineModule } from './medicine.module';
import { ClinicsModule } from './clinics.module';
import { Medicine, MedicineSchema } from 'src/schema/medicine';
import { Clinics, ClinicsSchema } from 'src/schema/clinics';
import { AppUsers, AppUsersSchema } from 'src/schema/appRegister';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Wishlist.name, schema: WishlistSchema },
      { name: AppUsers.name, schema: AppUsersSchema },
      { name: Medicine.name, schema: MedicineSchema },
      { name: Clinics.name, schema: ClinicsSchema },
    ]),
    AdminModule,
    MedicineModule,
    ClinicsModule,
  ],
  controllers: [WishlistController],
  providers: [WishlistService],
})
export class WishlistModule {}
