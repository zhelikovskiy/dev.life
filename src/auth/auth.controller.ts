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

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body() dto: { email: string; password: string }) {
        return this.authService.register(dto.email, dto.password);
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
