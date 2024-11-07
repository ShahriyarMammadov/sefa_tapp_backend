import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClinicsController } from 'src/controller/clinics/clinic.controller';
import { Clinics, ClinicsSchema } from 'src/schema/clinics';
import { ClinicsService } from 'src/services/clinics/clinic.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Clinics.name, schema: ClinicsSchema }]),
  ],
  controllers: [ClinicsController],
  providers: [ClinicsService],
  exports: [MongooseModule, ClinicsService],
})
export class ClinicsModule {}
