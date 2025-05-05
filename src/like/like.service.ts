import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikeService {
    constructor(private prisma: PrismaService) {}

    async toogleLike(projectId: string, userId: string) {
        const existing = await this.prisma.like.findFirst({
            where: {
                projectId,
                userId,
            },
        });

        if (existing) {
            return await this.prisma.like.delete({
                where: {
                    id: existing.id,
                },
            });
        } else {
            return await this.prisma.like.create({
                data: {
                    projectId,
                    userId,
                },
            });
        }
    }
}
