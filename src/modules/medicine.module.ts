import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicineController } from 'src/controller/medicine/medicine.controller';
import { Medicine, MedicineSchema } from 'src/schema/medicine';
import { MedicineService } from 'src/services/medicine/medicine.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Medicine.name, schema: MedicineSchema },
    ]),
  ],
  controllers: [MedicineController],
  providers: [MedicineService],
})
export class MedicineModule {}
