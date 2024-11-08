import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdsController } from 'src/controller/ads/ads.controller';
import { Ads, AdsSchema } from 'src/schema/ads';
import { AdsService } from 'src/services/ads/ads.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Ads.name, schema: AdsSchema }])],
  controllers: [AdsController],
  providers: [AdsService],
  exports: [MongooseModule],
})
export class AdsModule {}
