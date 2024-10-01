import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactUsController } from 'src/controller/contactUs/contactUs.controller';
import { ContactUs, ContactUsSchema } from 'src/schema/contactUs';
import { ContactUsService } from 'src/services/contactUs/contactUs.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ContactUs.name, schema: ContactUsSchema },
    ]),
  ],
  controllers: [ContactUsController],
  providers: [ContactUsService],
  exports: [MongooseModule],
})
export class ContactUsModule {}
