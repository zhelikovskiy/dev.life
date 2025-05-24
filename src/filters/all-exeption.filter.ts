import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        if (exception instanceof HttpException) {
            const status = exception.getStatus();
            const message = exception.getResponse();

            response.status(status).json({
                statusCode: status,
                message,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
        } else {
            this.logger.error(exception);

            response.status(500).json({
                statusCode: 500,
                message: 'Internal server error',
                timestamp: new Date().toISOString(),
                path: request.url,
            });
        }
    }
}
