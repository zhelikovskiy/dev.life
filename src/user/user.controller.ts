import {
    Controller,
    Get,
    UseGuards,
    Request,
    Param,
    Patch,
    Body,
    Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    async getMe(@Request() req: Request) {
        const user = await this.userService.getOneById(req.user.sub);
        return {
            username: user!.username,
            email: user!.email,
            avatar: user!.avatar,
        };
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('me')
    async updateMe(@Request() req: Request, @Body() dto: UpdateUserDto) {
        return this.userService.updateOne(req.user.sub, dto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('password')
    async updatePassword(
        @Request() req: Request,
        @Body() dto: { oldPassword: string; newPassword: string },
    ) {
        return this.userService.changePassword(
            req.user.sub,
            dto.oldPassword,
            dto.newPassword,
        );
    }

    @Get(':id')
    async getUserInfo(@Param('id') userId: string) {
        return await this.userService.getUserInfo(userId);
    }
}
