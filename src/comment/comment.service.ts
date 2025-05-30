import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
    constructor(private prisma: PrismaService) {}

    async create(projectId: string, userId: string, dto: CreateCommentDto) {
        return this.prisma.comment.create({
            data: {
                content: dto.content,
                projectId: projectId,
                userId: userId,
            },
        });
    }

    async update(commentId: string, userId: string, dto: UpdateCommentDto) {
        const comment = await this.prisma.comment.findUnique({
            where: { id: commentId, userId: userId },
        });
        if (!comment || comment.userId !== userId) {
            throw new ForbiddenException('Not your comment');
        }
        return this.prisma.comment.update({
            where: { id: commentId },
            data: {
                content: dto.content,
            },
        });
    }

    async remove(commentId: string, userId: string) {
        const comment = await this.prisma.comment.findUnique({
            where: { id: commentId, userId: userId },
        });
        if (!comment || comment.userId !== userId) {
            throw new ForbiddenException('Not your comment');
        }
        return this.prisma.comment.delete({
            where: { id: commentId },
        });
    }
}
