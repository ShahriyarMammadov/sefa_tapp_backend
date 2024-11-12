import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CommentDto } from 'src/dto/comment/comment.dto';
import { Comments } from 'src/schema/comments';
import { PharmacyService } from '../pharmacy/pharmacy.service';
import { DoctorService } from '../doctor/doctor.service';
import { ClinicsService } from '../clinics/clinic.service';
import { AppUserService } from '../user/userRegister.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name) private commentModel: Model<Comments>,
    private userService: AppUserService,
    private pharmacyService: PharmacyService,
    private doctorService: DoctorService,
    private clinicService: ClinicsService,
  ) {}

  async addComment(dto: CommentDto): Promise<Comments> {
    if (!isValidObjectId(dto.user)) {
      throw new BadRequestException(`Invalid user ID format.`);
    }

    const user = await this.userService.findOne(dto.user);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (dto.pharmacy) {
      if (!isValidObjectId(dto.pharmacy)) {
        throw new BadRequestException(`Invalid pharmacy ID format.`);
      }

      const pharmacy = await this.pharmacyService.findOne(dto.pharmacy);
      if (!pharmacy) {
        throw new NotFoundException('Pharmacy not found');
      }
    }

    if (dto.doctor) {
      if (!isValidObjectId(dto.doctor)) {
        throw new BadRequestException(`Invalid doctor ID format.`);
      }

      const doctor = await this.doctorService.findOne(dto.doctor);
      if (!doctor) {
        throw new NotFoundException('Doctor not found');
      }
    }

    if (dto.clinic) {
      if (!isValidObjectId(dto.clinic)) {
        throw new BadRequestException(`Invalid clinic ID format.`);
      }

      const clinic = await this.clinicService.findOne(dto.clinic);
      if (!clinic) {
        throw new NotFoundException('Clinic not found');
      }
    }

    const newComment = new this.commentModel(dto);
    return newComment.save();
  }

  async findCommentsByIds(filter: {
    user?: string;
    clinic?: string;
    doctor?: string;
    pharmacy?: string;
  }): Promise<Comments[]> {
    const queryFilter: any = {};

    // Dynamically add filters based on input
    if (filter.user) queryFilter.user = filter.user;
    if (filter.clinic) queryFilter.clinic = filter.clinic;
    if (filter.doctor) queryFilter.doctor = filter.doctor;
    if (filter.pharmacy) queryFilter.pharmacy = filter.pharmacy;

    const comments = await this.commentModel
      .find(queryFilter)
      .populate('user', 'fullName email')
      .populate('clinic', 'name location')
      .populate('doctor', 'name surname')
      .populate('pharmacy', 'name location')
      .exec();

    if (!comments || comments.length === 0) {
      throw new NotFoundException('Comments not found for the given IDs');
    }

    return comments;
  }

  async calculateAverageRating(filter: {
    doctor?: string;
    pharmacy?: string;
    clinic?: string;
  }): Promise<number> {
    if (filter.doctor && !isValidObjectId(filter.doctor)) {
      throw new BadRequestException('Invalid doctor ID format.');
    }
    if (filter.pharmacy && !isValidObjectId(filter.pharmacy)) {
      throw new BadRequestException('Invalid pharmacy ID format.');
    }
    if (filter.clinic && !isValidObjectId(filter.clinic)) {
      throw new BadRequestException('Invalid clinic ID format.');
    }

    const comments = await this.findCommentsByIds(filter);

    if (comments?.length === 0) {
      return 0;
    }

    const totalRating = comments.reduce(
      (acc, comment) => acc + (comment.rating || 0),
      0,
    );
    const averageRating = totalRating / comments.length;

    return averageRating;
  }

  async deleteComment(commentId: string): Promise<{ message: string }> {
    if (!isValidObjectId(commentId)) {
      throw new BadRequestException(`Invalid ID format.`);
    }

    const deletedComment = await this.commentModel
      .findByIdAndDelete(commentId)
      .exec();

    if (!deletedComment) {
      throw new NotFoundException(
        'No comment found to delete with the given ID',
      );
    }

    return { message: 'Comment deleted successfully' };
  }
}
