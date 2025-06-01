import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { comparePasswordsHash, generatePasswordHash } from 'src/utils/utils';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
    ) {}

    async register(dto: CreateUserDto) {
        const hash = await generatePasswordHash(dto.password);

        const user = await this.userService.createOne({
            ...dto,
            password: hash,
        });
        return this.sighToken(user.id, user.email);
    }

    async login(email: string, password: string) {
        const user = await this.userService.getOneByEmail(email);
        if (!user) throw new ForbiddenException('Invalid credentials');

        const match = await comparePasswordsHash(password, user.password);
        if (!match) throw new ForbiddenException('Invalid credentials');

        return this.sighToken(user.id, user.email);
    }

    async sighToken(userId: string, email: string) {
        const payload = { sub: userId, email };
        const token = await this.jwtService.signAsync(payload);
        return { access_token: token };
    }
}
