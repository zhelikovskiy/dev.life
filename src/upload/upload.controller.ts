import * as multer from 'multer';
import {
    Controller,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
@UseGuards(AuthGuard('jwt'))
export class UploadController {
    constructor(private uploadService: UploadService) {}

    @Post()
    @UseInterceptors(
        FileInterceptor('file', {
            storage: multer.memoryStorage(),
        }),
    )
    async upload(@UploadedFile() file: Express.Multer.File) {
        const url = await this.uploadService.upload(file);
        return { url };
    }
}
