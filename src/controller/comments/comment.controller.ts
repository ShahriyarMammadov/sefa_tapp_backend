import { Controller, Post, Body, Query, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommentDto } from 'src/dto/comment/comment.dto';
import { GetCommentDto } from 'src/dto/comment/getComment.dto';
import { Comments } from 'src/schema/comments';
import { CommentsService } from 'src/services/comments/comments.service';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('add')
  async addComment(@Body() dto: CommentDto): Promise<Comments> {
    return this.commentsService.addComment(dto);
  }

  @Post('find')
  async findCommentsByIds(
    @Body()
    dto: GetCommentDto,
  ): Promise<Comments[]> {
    return this.commentsService.findCommentsByIds(dto);
  }

  @Delete('delete')
  async deleteComment(
    @Query('commentId') commentId: string,
  ): Promise<{ message: string }> {
    await this.commentsService.deleteComment(commentId);

    return { message: 'Comment deleted successfully' };
  }
}
