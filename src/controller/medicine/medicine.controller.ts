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
import { MedicineService } from 'src/services/medicine/medicine.service';
import { CreateMedicineDto } from 'src/dto/medicine/create-medicine.dto';
import { Medicine } from 'src/schema/medicine';
import { UpdateMedicineDto } from 'src/dto/medicine/update-medicine.dto';

@ApiTags('Medicine')
@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Post()
  @ApiOperation({ summary: 'Create New Medicine' })
  async create(
    @Body() createMedicineDto: CreateMedicineDto,
  ): Promise<Medicine> {
    return this.medicineService.create(createMedicineDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get All Medicine' })
  async findAll(): Promise<Medicine[]> {
    return this.medicineService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Medicine By ID' })
  async findOne(@Param('id') id: string): Promise<Medicine> {
    return this.medicineService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edit Medicine By ID' })
  async update(
    @Param('id') id: string,
    @Body() updateMedicineDto: UpdateMedicineDto,
  ): Promise<Medicine> {
    return this.medicineService.update(id, updateMedicineDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Medicine By ID' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.medicineService.remove(id);
  }
}
