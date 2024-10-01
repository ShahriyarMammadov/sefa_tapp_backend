import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogController } from 'src/controller/blog/blog.controller';
import { Blog, BlogSchema } from 'src/schema/blog';
import { BlogService } from 'src/services/blog/blog.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  controllers: [BlogController],
  providers: [BlogService],
  exports: [MongooseModule],
})
export class BlogModule {}
