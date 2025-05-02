import '@nestjs/common';

declare module '@nestjs/common' {
    interface Request {
        user: {
            sub: string;
            email: string;
        };
    }
}
