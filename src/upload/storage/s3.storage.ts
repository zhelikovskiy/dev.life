/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { IStorageService } from './storage.interface';

@Injectable()
export class S3StorageService implements IStorageService {
    async save(file: Express.Multer.File): Promise<string> {
        return 's3-file-url';
    }
}
