import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pharmacy, PharmacySchema } from 'src/schema/pharmacy';
import { AppUsers, userSchema } from 'src/schema/users';
import { PharmacyProductsController } from 'src/controller/pharmacyProducts/pharmacyProducts.controller';
import { PharmacyProductsService } from 'src/services/pharmacyProduct/pharmacyProduct.service';
import {
  PharmacyProducts,
  PharmacyProductsSchema,
} from 'src/schema/pharmacyProducts';
import { Comments, CommentSchema } from 'src/schema/comments';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pharmacy.name, schema: PharmacySchema },
      { name: Comments.name, schema: CommentSchema },
      { name: AppUsers.name, schema: userSchema },
      { name: PharmacyProducts.name, schema: PharmacyProductsSchema },
    ]),
  ],
  controllers: [PharmacyProductsController],
  providers: [PharmacyProductsService],
  exports: [MongooseModule, PharmacyProductsService],
})
export class PharmacyProductsModule {}
