import {
    Controller,
    Get,
    UseGuards,
    Request,
    Param,
    Patch,
    Body,
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
        return await this.userService.getOneById(req.user.sub);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('me')
    async updateMe(@Request() req: Request, @Body() dto: UpdateUserDto) {
        return this.userService.updateOne(req.user.sub, dto);
    }

    @Get(':id')
    async getUserInfo(@Param('id') userId: string) {
        return await this.userService.getUserInfo(userId);
    }
}
