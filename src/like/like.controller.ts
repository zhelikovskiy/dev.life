import {
    Body,
    Controller,
    Post,
    Req,
    Request,
    UseGuards,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { AuthGuard } from '@nestjs/passport';
import { ToggleLikeDto } from './dto/toggle-like.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('likes')
export class LikeController {
    constructor(private likeService: LikeService) {}

    @Post('')
    toggle(@Req() req: Request, @Body() dto: ToggleLikeDto) {
        return this.likeService.toogleLike(req.user.sub, dto);
    }
}
