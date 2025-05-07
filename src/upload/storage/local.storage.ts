import { BadRequestException, Injectable } from '@nestjs/common';
import { IStorageService } from './storage.interface';
import * as fs from 'fs';
import * as path from 'path';
import { extname } from 'path';
import { checkFileSize, checkFileType } from './storage.utils';

@Injectable()
export class LocalStorageService implements IStorageService {
    async save(file: Express.Multer.File): Promise<string> {
        if (!checkFileType(file)) {
            throw new BadRequestException(
                'Invalid file type. Only images are allowed.',
            );
        }

        if (!checkFileSize(file)) {
            throw new BadRequestException(
                'File size exceeds the maximum limit of 2 MB.',
            );
        }

        const uploadDir = path.join(__dirname, process.env.UPLOAD_DIR!);
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const fileName = `${Date.now()}-${Math.random()}${extname(file.originalname)}`;
        const filePath = path.join(uploadDir, fileName);
        await fs.promises.writeFile(filePath, file.buffer);

        return filePath;
    }
}
