export const checkFileType = (file: Express.Multer.File): boolean => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimetype = fileTypes.test(file.mimetype);

    return mimetype;
};

export const checkFileSize = (file: Express.Multer.File): boolean => {
    const maxSize = 5 * 1024 * 1024;
    return file.size <= maxSize;
};
