import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { TagService } from 'src/tag/tag.service';

@Injectable()
export class ProjectService {
    constructor(
        private prisma: PrismaService,
        private tagService: TagService,
    ) {}

    async create(authorId: string, dto: CreateProjectDto) {
        const tags = await this.tagService.findOrCreateMany(dto.tags);

        return this.prisma.project.create({
            data: {
                ...dto,
                authorId,
                tags: {
                    connect: tags.map((tag) => ({ id: tag.id })),
                },
            },
        });
    }

    async findAll() {
        return this.prisma.project.findMany({
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

    async findOneById(id: string) {
        return this.prisma.project.findUnique({
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

    async updateOne(id: string, authorId: string, dto: UpdateProjectDto) {
        const project = await this.prisma.project.findUnique({ where: { id } });
        if (!project) throw new NotFoundException('Project not found');
        if (project.authorId !== authorId)
            throw new ForbiddenException('Access denied');

        const tags = dto.tags
            ? await this.tagService.findOrCreateMany(dto.tags)
            : [];

        return this.prisma.project.update({
            where: { id },
            data: {
                ...dto,
                tags: { set: tags.map((tag) => ({ id: tag.id })) },
            },
        });
    }

    async deleteOne(id: string, authorId: string) {
        const project = await this.prisma.project.findUnique({ where: { id } });
        if (!project) throw new NotFoundException('Project not found');
        if (project.authorId !== authorId)
            throw new ForbiddenException('Access denied');

        return this.prisma.project.delete({ where: { id } });
    }
}
