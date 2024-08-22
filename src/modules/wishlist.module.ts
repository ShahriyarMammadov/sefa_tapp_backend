import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WishlistController } from 'src/controller/wishlist/wishlist.controller';
import { Wishlist, WishlistSchema } from 'src/schema/wishlist';
import { WishlistService } from 'src/services/wishlist/wishlist.service';
import { AdminModule } from './admin.module';
import { MedicineModule } from './medicine.module';
import { ClinicsModule } from './clinics.module';
import { Admin, AdminSchema } from 'src/schema/admin';
import { Medicine, MedicineSchema } from 'src/schema/medicine';
import { Clinics, ClinicsSchema } from 'src/schema/clinics';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Wishlist.name, schema: WishlistSchema },
      { name: Admin.name, schema: AdminSchema },
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
