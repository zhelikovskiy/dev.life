import {
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UseGuards,
    Request,
} from '@nestjs/common';
import { FollowService } from './follow.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('follows')
export class FollowController {
    constructor(private readonly followService: FollowService) {}

    @Post(':userId')
    async followUser(@Request() req: Request, @Param('userId') userId: string) {
        return this.followService.createOne(req.user.sub, userId);
    }

    @Delete(':userId')
    async unfollowUser(
        @Request() req: Request,
        @Param('userId') userId: string,
    ) {
        return this.followService.deleteOne(req.user.sub, userId);
    }

    @Get(':userId/followers')
    async getFollowers(@Request() req: Request) {
        return this.followService.getFollowers(req.user.sub);
    }

    @Get(':userId/following')
    async getFollowing(@Request() req: Request) {
        return this.followService.getFollowing(req.user.sub);
    }
}
