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
      console.log('exception customError', exception);
      status = exception.getStatus();
      message = exception.message;
      code = exception.messageCode;
    } else if (exception instanceof HttpException) {

      console.log('exception HttpException', exception);

      /*
      {
      response =
        "statusCode": 400,
        "message": [
           "price must be a number conforming to the specified constraints"
        ],
        "error": "Bad Request"
        }
      */
      // todo 确认exception.getResponse() 的数据结构是为 {statusCode: number,message: string[], error: string}？
      const response = exception.getResponse() as {statusCode: number,message: string[], error: string}
      status = response.statusCode;
      message = response.message[0] as string;
      code = status;
    } else {
      console.log('exception other', exception);
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
