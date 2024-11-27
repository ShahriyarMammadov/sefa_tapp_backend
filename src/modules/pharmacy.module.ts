import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PharmacyController } from 'src/controller/pharmacy/pharmacy.controller';
import { Pharmacy, PharmacySchema } from 'src/schema/pharmacy';
import { PharmacyService } from 'src/services/pharmacy/pharmacy.service';
import { AppUsers } from 'src/schema/users';
import {
  PharmacyProducts,
  PharmacyProductsSchema,
} from 'src/schema/pharmacyProducts';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pharmacy.name, schema: PharmacySchema },
      { name: AppUsers.name, schema: AppUsers },
      { name: PharmacyProducts.name, schema: PharmacyProductsSchema },
    ]),
  ],
  controllers: [PharmacyController],
  providers: [PharmacyService],
  exports: [MongooseModule, PharmacyService],
})
export class PharmacyModule {}
