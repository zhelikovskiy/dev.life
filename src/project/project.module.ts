import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TagModule } from 'src/tag/tag.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule, TagModule],
    controllers: [ProjectController],
    providers: [ProjectService],
})
export class ProjectModule {}
