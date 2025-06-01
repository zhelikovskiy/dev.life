import { Injectable } from '@nestjs/common';
import { Follow } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FollowService {
    constructor(private prisma: PrismaService) {}

    async createOne(followerId: string, followingId: string): Promise<Follow> {
        return await this.prisma.follow.create({
            data: {
                followerId,
                followingId,
            },
        });
    }
    async deleteOne(followerId: string, followingId: string): Promise<void> {
        await this.prisma.follow.delete({
            where: {
                followerId_followingId: {
                    followerId,
                    followingId,
                },
            },
        });
    }

    async getFollowers(followingId: string): Promise<Follow[]> {
        return await this.prisma.follow.findMany({
            where: { followingId },
            include: { follower: true },
        });
    }

    async getFollowing(followerId: string): Promise<Follow[]> {
        return await this.prisma.follow.findMany({
            where: { followerId },
            include: { following: true },
        });
    }
}
