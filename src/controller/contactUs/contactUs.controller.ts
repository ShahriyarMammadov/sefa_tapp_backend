import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateContactUsDto } from 'src/dto/contactUs/create-contactUs.dto';
import { ContactUsService } from 'src/services/contactUs/contactUs.service';

@ApiTags('Contact-us')
@Controller('contact-us')
export class ContactUsController {
  constructor(private readonly contactUsService: ContactUsService) {}

  @Post()
  create(@Body() createContactUsDto: CreateContactUsDto) {
    return this.contactUsService.create(createContactUsDto);
  }

  @Get()
  findAll() {
    return this.contactUsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactUsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactUsService.remove(id);
  }
}
