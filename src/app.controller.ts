import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {Response1} from "./common/interceptors/response.interceptor";

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get('test')
  getHello(): Response1<{a: number}> {
    return this.appService.getHello();
  }


  @Get('test1')
  getHello1(): Response1<{a: number}> {
    return this.appService.getHello1();
  }

  @Get('test2')
  getHello2(): Response1<{a: number}> {
    return this.appService.getHello2();
  }


  @Get('test3')
  getHello3(): Response1<{a: number}> {
    return this.appService.getHello3();
  }

  @Get('test4')
  getHello4(): Response1<{a: number}> {
    return this.appService.getHello4();
  }
}
