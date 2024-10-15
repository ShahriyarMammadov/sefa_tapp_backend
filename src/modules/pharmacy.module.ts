import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PharmacyController } from 'src/controller/pharmacy/pharmacy.controller';
import { Comment, Pharmacy, PharmacySchema } from 'src/schema/pharmacy';
import { PharmacyService } from 'src/services/pharmacy/pharmacy.service';
import { AppUsers } from 'src/schema/appRegister';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pharmacy.name, schema: PharmacySchema },
      { name: AppUsers.name, schema: AppUsers },
    ]),
  ],
  controllers: [PharmacyController],
  providers: [PharmacyService],
  exports: [MongooseModule],
})
export class PharmacyModule {}
