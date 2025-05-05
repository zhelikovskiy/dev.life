import {
    Controller,
    Param,
    Post,
    Req,
    Request,
    UseGuards,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('likes')
export class LikeController {
    constructor(private likeService: LikeService) {}

    @Post(':id')
    toggle(@Param('projectId') projectId: string, @Req() req: Request) {
        return this.likeService.toogleLike(projectId, req.user.sub);
    }
}
