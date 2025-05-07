export interface IStorageService {
    save(file: Express.Multer.File): Promise<string>;
}
