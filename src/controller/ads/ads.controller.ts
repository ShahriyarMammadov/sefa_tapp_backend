import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateAdsDto } from 'src/dto/ads.dto';
import { AdsService } from 'src/services/ads/ads.service';

@ApiTags('ADS (reklam)')
@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Post()
  create(@Body() createAdsDto: CreateAdsDto) {
    return this.adsService.create(createAdsDto);
  }

  @Get()
  findAll(@Param('category') category: string) {
    return this.adsService.findByCategory(category);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adsService.remove(id);
  }
}
