import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ToggleLikeDto } from './dto/toggle-like.dto';

@Injectable()
export class LikeService {
    constructor(private prisma: PrismaService) {}

    async toogleLike(userId: string, dto: ToggleLikeDto) {
        if ((dto.postId && dto.projectId) || (!dto.postId && !dto.projectId)) {
            throw new BadRequestException(
                'Provide either postId or projectId, but not both',
            );
        }

        const where: { userId: string; postId?: string; projectId?: string } = {
            userId,
            ...(dto.postId
                ? { postId: dto.postId }
                : { projectId: dto.projectId }),
        };

        const existing = await this.prisma.like.findFirst({
            where,
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
                    postId: dto.postId,
                    projectId: dto.projectId,
                    userId,
                },
            });
        }
    }
}
