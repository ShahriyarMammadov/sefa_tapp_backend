import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateBlogDto } from 'src/dto/blog/create-blog.dto';
import { Blog } from 'src/schema/blog';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const newBlog = new this.blogModel(createBlogDto);
    return newBlog.save();
  }

  async findAll(): Promise<Blog[]> {
    return this.blogModel.find().exec();
  }

  async findOne(id: string): Promise<Blog> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format.`);
    }

    const blog = await this.blogModel.findById(id).exec();
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return blog;
  }

  async update(id: string, updateBlogDto: CreateBlogDto): Promise<Blog> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format.`);
    }

    const updatedBlog = await this.blogModel
      .findByIdAndUpdate(id, updateBlogDto, { new: true })
      .exec();
    if (!updatedBlog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return updatedBlog;
  }

  async remove(
    id: string,
  ): Promise<{ deletedBlog: Blog; remainingBlogs: Blog[] }> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format.`);
    }

    const deletedBlog = await this.blogModel.findByIdAndDelete(id).exec();
    if (!deletedBlog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    const remainingBlogs = await this.blogModel.find().exec();
    return { deletedBlog, remainingBlogs };
  }
}
