import {
    Controller,
    Post,
    Body,
    UseGuards,
    Request,
    Get,
    Param,
    Patch,
    Req,
    Delete,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectController {
    constructor(private projectService: ProjectService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Req() req: Request, @Body() dto: CreateProjectDto) {
        return this.projectService.create(req.user.sub, dto);
    }

    @Get()
    findAll() {
        return this.projectService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.projectService.findOneById(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Req() req: Request,
        @Body() dto: UpdateProjectDto,
    ) {
        return this.projectService.updateOne(id, req.user.sub, dto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    delete(@Param('id') id: string, @Req() req: Request) {
        return this.projectService.deleteOne(id, req.user.sub);
    }
}
