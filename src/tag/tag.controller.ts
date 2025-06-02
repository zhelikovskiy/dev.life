import { Body, Controller, Post } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Post()
    async findRoCreate(@Body('name') name: string) {
        return this.tagService.findOrCreate(name);
    }
}
