import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    const status = exception.getStatus();
    const message = exception.message;

    console.log(message);

    response.status(status).json({
      result: 'error',
      message,
      data: null,
      code: status
      // statusCode: status,
      // message,
      // timestamp: new Date().toISOString(),
      // path: ctx.getRequest().url,
    });
  }
}