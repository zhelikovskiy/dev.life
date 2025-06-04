import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TagModule } from 'src/tag/tag.module';

@Module({
    imports: [TagModule],
    controllers: [ProjectController],
    providers: [ProjectService],
})
export class ProjectModule {}
