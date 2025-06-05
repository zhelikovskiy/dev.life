import {
    Controller,
    Request,
    Req,
    Body,
    Post,
    UseGuards,
    Patch,
    Param,
    Delete,
    Get,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
export class PostController {
    constructor(private postService: PostService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Req() req: Request, @Body() dto: CreatePostDto) {
        return this.postService.createOne(req.user.sub, dto);
    }

    @Get()
    findAll() {
        return this.postService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.postService.findOneById(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    update(
        @Req() req: Request,
        @Param('id') id: string,
        @Body() dto: CreatePostDto,
    ) {
        return this.postService.updateOne(id, req.user.sub, dto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    delete(@Req() req: Request, @Param('id') id: string) {
        return this.postService.deleteOne(id, req.user.sub);
    }
}
