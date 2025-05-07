import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { LocalStorageService } from './storage/local.storage';

@Module({
    controllers: [UploadController],
    providers: [
        UploadService,
        {
            provide: 'StorageService',
            useClass: LocalStorageService,
        },
    ],
})
export class UploadModule {}
