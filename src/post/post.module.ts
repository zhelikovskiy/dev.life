import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TagModule } from 'src/tag/tag.module';

@Module({
    imports: [PrismaModule, TagModule],
    controllers: [PostController],
    providers: [PostService],
})
export class PostModule {}
