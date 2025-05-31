import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { comparePasswordsHash, generatePasswordHash } from 'src/utils/utils';
import { GetUserInfoDto } from './dto/get-user-info.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async createOne(dto: CreateUserDto): Promise<User> {
        const existingEmail = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (existingEmail)
            throw new ForbiddenException(
                'User with this email already exists.',
            );

        const existingUsername = await this.prisma.user.findUnique({
            where: { username: dto.username },
        });

        if (existingUsername)
            throw new ForbiddenException('This username is already taken.');

        return await this.prisma.user.create({
            data: {
                username: dto.username,
                email: dto.email,
                password: dto.password,
                avatar: dto.avatar,
            },
        });
    }

    async getOneById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async getOneByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async updateOne(userId: string, dto: UpdateUserDto): Promise<User> {
        const existingUsername = await this.prisma.user.findUnique({
            where: { username: dto.username },
        });

        if (existingUsername)
            throw new ForbiddenException('This username is already taken.');

        return this.prisma.user.update({
            where: { id: userId },
            data: {
                username: dto.username,
                avatar: dto.avatar,
            },
        });
    }

    async changePassword(
        userId: string,
        oldPassword: string,
        newPassword: string,
    ): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) throw new ForbiddenException('User not found');

        const isMatch = await comparePasswordsHash(oldPassword, user.password);
        if (!isMatch) throw new ForbiddenException('Old password is incorrect');

        const hashed = await generatePasswordHash(newPassword);
        return this.prisma.user.update({
            where: { id: userId },
            data: { password: hashed },
        });
    }

    async getUserInfo(userId: string): Promise<GetUserInfoDto | null> {
        return await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                username: true,
                avatar: true,
            },
        });
    }
}
