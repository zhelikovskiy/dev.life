import { Inject, Injectable } from '@nestjs/common';
import { IStorageService } from './storage/storage.interface';

@Injectable()
export class UploadService {
    constructor(
        @Inject('StorageService') private storageService: IStorageService,
    ) {}

    upload(file: Express.Multer.File): Promise<string> {
        return this.storageService.save(file);
    }
}
