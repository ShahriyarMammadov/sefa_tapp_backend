import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, reservationSchema } from 'src/schema/reservation';
import { AppUsers, userSchema } from 'src/schema/users';
import { Doctor, DoctorSchema } from 'src/schema/doctor';
import { SearchController } from 'src/controller/search/search.controller';
import { SearchService } from 'src/services/search/search.service';
import { Pharmacy, PharmacySchema } from 'src/schema/pharmacy';
import { Clinics, ClinicsSchema } from 'src/schema/clinics';
import { Medicine, MedicineSchema } from 'src/schema/medicine';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pharmacy.name, schema: PharmacySchema },
      { name: Clinics.name, schema: ClinicsSchema },
      { name: Medicine.name, schema: MedicineSchema },
      { name: Doctor.name, schema: DoctorSchema },
    ]),
  ],
  controllers: [SearchController],
  providers: [SearchService],
  exports: [MongooseModule, SearchService],
})
export class SearchModule {}
