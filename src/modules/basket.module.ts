import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BasketController } from 'src/controller/basket/basket.controller';
import { Basket, BasketSchema } from 'src/schema/basket';
import { BasketService } from 'src/services/basket/basket.service';
import { AppUsers, userSchema } from 'src/schema/users';
import {
  PharmacyProducts,
  PharmacyProductsSchema,
} from 'src/schema/pharmacyProducts';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Basket.name, schema: BasketSchema }]),
    MongooseModule.forFeature([{ name: AppUsers.name, schema: userSchema }]),
    MongooseModule.forFeature([
      { name: PharmacyProducts.name, schema: PharmacyProductsSchema },
    ]),
  ],
  controllers: [BasketController],
  providers: [BasketService],
  exports: [MongooseModule],
})
export class BasketModule {}
