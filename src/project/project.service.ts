import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
    constructor(private prisma: PrismaService) {}

    async create(userId: string, dto: CreateProjectDto) {
        return this.prisma.project.create({
            data: {
                ...dto,
                userId,
            },
        });
    }

    async findAll() {
        return this.prisma.project.findMany({
            include: {
                user: true,
                comments: true,
                _count: {
                    select: { likes: true },
                },
            },
        });
    }

    async findOne(id: string) {
        return this.prisma.project.findUnique({
            where: { id },
            include: {
                user: true,
                comments: true,
            },
        });
    }

    async update(id: string, userId: string, dto: UpdateProjectDto) {
        const project = await this.prisma.project.findUnique({ where: { id } });
        if (!project || project.userId !== userId) {
            throw new ForbiddenException('Access denied');
        }
        return this.prisma.project.update({
            where: { id },
            data: {
                ...dto,
            },
        });
    }

    async remove(id: string, userId: string) {
        const project = await this.prisma.project.findUnique({ where: { id } });
        if (!project || project.userId !== userId) {
            throw new ForbiddenException('Access denied');
        }
        return this.prisma.project.delete({ where: { id } });
    }
}
