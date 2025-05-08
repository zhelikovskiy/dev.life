import {
    Body,
    Controller,
    Delete,
    Param,
    Patch,
    Post,
    Req,
    Request,
    UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('comments')
export class CommentController {
    constructor(private commentService: CommentService) {}

    @Post(':projectId')
    create(
        @Param('projectId') projectId: string,
        @Body() dto: CreateCommentDto,
        @Req() req: Request,
    ) {
        return this.commentService.create(projectId, req.user.sub, dto);
    }

    @Patch(':commentId')
    update(
        @Param('commentId') commentId: string,
        @Body() dto: CreateCommentDto,
        @Req() req: Request,
    ) {
        return this.commentService.update(commentId, req.user.sub, dto);
    }

    @Delete(':commentId')
    remove(@Param('commentId') commentId: string, @Req() req: Request) {
        return this.commentService.remove(commentId, req.user.sub);
    }
}
