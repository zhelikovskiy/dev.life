import { LocalStorageService } from './local.storage';
import { S3StorageService } from './s3.storage';

export const Storages = {
    local: LocalStorageService,
    s3: S3StorageService,
};
