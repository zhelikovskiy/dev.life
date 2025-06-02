import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TagService {
    constructor(private readonly prismaService: PrismaService) {}

    async findOrCreate(name: string) {
        return await this.prismaService.tag.upsert({
            where: { name },
            update: {},
            create: { name },
        });
    }
}
