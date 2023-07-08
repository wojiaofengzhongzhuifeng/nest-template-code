// common/filters/all-exceptions.filter.ts
import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomError } from '../exceptions/custom-error';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let message: string;
    let code: number;

    if (exception instanceof CustomError) {
      status = exception.getStatus();
      message = exception.message;
      code = exception.messageCode;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse() as string;
      code = status;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
      code = status;
    }

    response.status(status).json({
      code: code,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
