import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { TagService } from 'src/tag/tag.service';

@Injectable()
export class PostService {
    constructor(
        private prisma: PrismaService,
        private tagService: TagService,
    ) {}

    async createOne(authorId: string, dto: CreatePostDto) {
        const tags = dto.tags
            ? await this.tagService.findOrCreateMany(dto.tags)
            : [];

        return this.prisma.post.create({
            data: {
                ...dto,
                authorId,
                tags: {
                    connect: tags.map((tag) => ({ id: tag.id })),
                },
            },
        });
    }

    async updateOne(id: string, authorId: string, dto: CreatePostDto) {
        const post = await this.prisma.post.findUnique({
            where: { id },
        });
        if (!post) throw new NotFoundException('Project not found');
        if (post.authorId !== authorId)
            throw new ForbiddenException('Access denied');

        const tags = dto.tags
            ? await this.tagService.findOrCreateMany(dto.tags)
            : [];

        return this.prisma.post.update({
            where: { id, authorId },
            data: {
                ...dto,
                tags: {
                    set: tags.map((tag) => ({ id: tag.id })),
                },
            },
        });
    }

    async findOneById(id: string) {
        return await this.prisma.post.findUnique({
            where: { id },
            include: {
                author: true,
                comments: {
                    include: {
                        replies: {
                            include: {
                                replies: true,
                            },
                        },
                        author: true,
                    },
                },
                tags: true,
                _count: {
                    select: { likes: true },
                },
            },
        });
    }

    async findAll() {
        return await this.prisma.post.findMany({
            include: {
                author: true,
                comments: {
                    include: {
                        replies: {
                            include: {
                                replies: true,
                            },
                        },
                        author: true,
                    },
                },
                tags: true,
                _count: {
                    select: { likes: true },
                },
            },
        });
    }

    async deleteOne(id: string, authorId: string) {
        const post = await this.prisma.post.findUnique({
            where: { id },
        });
        if (!post) throw new NotFoundException('Post not found');
        if (post.authorId !== authorId)
            throw new ForbiddenException('Access denied');

        return this.prisma.post.delete({
            where: { id, authorId },
        });
    }
}
