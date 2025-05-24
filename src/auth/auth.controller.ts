import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body() dto: CreateUserDto) {
        return this.authService.register(dto);
    }

    @Post('login')
    login(@Body() dto: { email: string; password: string }) {
        return this.authService.login(dto.email, dto.password);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getMe(@Request() req: Request) {
        return req.user;
    }
}
