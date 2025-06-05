import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { LikeModule } from './like/like.module';
import { CommentModule } from './comment/comment.module';
import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';
import { FollowModule } from './follow/follow.module';
import { TagModule } from './tag/tag.module';
import { PostModule } from './post/post.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        PrismaModule,
        AuthModule,
        ProjectModule,
        LikeModule,
        CommentModule,
        UploadModule,
        UserModule,
        FollowModule,
        TagModule,
        PostModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
