import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Doctor, DoctorSchema } from 'src/schema/doctor';
import { SearchController } from 'src/controller/search/search.controller';
import { SearchService } from 'src/services/search/search.service';
import { Pharmacy, PharmacySchema } from 'src/schema/pharmacy';
import { Clinics, ClinicsSchema } from 'src/schema/clinics';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pharmacy.name, schema: PharmacySchema },
      { name: Clinics.name, schema: ClinicsSchema },
      { name: Doctor.name, schema: DoctorSchema },
    ]),
  ],
  controllers: [SearchController],
  providers: [SearchService],
  exports: [MongooseModule, SearchService],
})
export class SearchModule {}
