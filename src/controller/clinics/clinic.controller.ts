import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ClinicsService } from '../../services/clinics/clinic.service';
import { CreateClinicsDto } from '../../dto/clinics/create-clinic.dto';
import { Clinics } from '../../schema/clinics';
import { UpdateClinicsDto } from 'src/dto/clinics/update-clinic.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Clinics')
@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Post()
  async create(@Body() createClinicsDto: CreateClinicsDto): Promise<Clinics> {
    return this.clinicsService.create(createClinicsDto);
  }

  @Get()
  async findAll(): Promise<Clinics[]> {
    return this.clinicsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Clinics> {
    return this.clinicsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClinicsDto: UpdateClinicsDto,
  ): Promise<Clinics> {
    return this.clinicsService.update(id, updateClinicsDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.clinicsService.remove(id);
  }
}
