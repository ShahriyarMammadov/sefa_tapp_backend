import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePharmacyProductDto } from 'src/dto/pharmacyProduct.dto';
import { PharmacyProductsService } from 'src/services/pharmacyProduct/pharmacyProduct.service';

@ApiTags('Pharmacy Products')
@Controller('pharmacyProducts')
export class PharmacyProductsController {
  constructor(
    private readonly pharmacyProductsService: PharmacyProductsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'create new pharmacy product' })
  @ApiBody({ type: CreatePharmacyProductDto })
  create(@Body() createPharmacyProductDto: CreatePharmacyProductDto) {
    return this.pharmacyProductsService.create(createPharmacyProductDto);
  }

  @Get()
  findAll() {
    return this.pharmacyProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pharmacyProductsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: Partial<CreatePharmacyProductDto>,
  ) {
    return this.pharmacyProductsService.update(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pharmacyProductsService.remove(id);
  }
}
