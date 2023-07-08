import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {Response1} from "./common/interceptors/response.interceptor";

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}


  // 正常业务响应情况
  @Get('test')
  getHello(): Response1<{a: number}> {
    return this.appService.getHello();
  }


  // 错误情况1：业务错误
  @Get('test1')
  getHello1(): Response1<{a: number}> {
    return this.appService.getHello1();
  }
}
