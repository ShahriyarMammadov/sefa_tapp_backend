import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PharmacyService } from 'src/services/pharmacy/pharmacy.service';
import { CreatePharmacyDto } from 'src/dto/pharmacy/create-pharmacy.dto';
import { Pharmacy } from 'src/schema/pharmacy';
import { PharmacyProducts } from 'src/schema/pharmacyProducts';

@ApiTags('Pharmacy')
@Controller('pharmacy')
export class PharmacyController {
  constructor(private readonly pharmacyService: PharmacyService) {}

  @Post()
  @ApiOperation({ summary: 'Create New Pharmacy' })
  async create(
    @Body() createPharmacyDto: CreatePharmacyDto,
  ): Promise<Pharmacy> {
    return this.pharmacyService.create(createPharmacyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get All Pharmacy' })
  async findAll(): Promise<Pharmacy[]> {
    return this.pharmacyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Pharmacy By ID' })
  async findOne(@Param('id') id: string): Promise<Pharmacy> {
    return this.pharmacyService.findOne(id);
  }

  @Get('/products/:id')
  @ApiOperation({ summary: 'Get Pharmacy products By pharmacy ID' })
  async getProductsByPharmacyId(
    @Param('id') pharmacyId: string,
  ): Promise<PharmacyProducts[]> {
    return this.pharmacyService.getProductsByPharmacyId(pharmacyId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edit Pharmacy By ID' })
  async update(
    @Param('id') id: string,
    @Body() createPharmacyDto: CreatePharmacyDto,
  ): Promise<Pharmacy> {
    return this.pharmacyService.update(id, createPharmacyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Pharmacy By ID' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.pharmacyService.remove(id);
  }
}
