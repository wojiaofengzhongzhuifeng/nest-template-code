import { Injectable } from '@nestjs/common';
import {messageCodeMap, Response1} from "./common/interceptors/response.interceptor";

@Injectable()
export class AppService {
  getHello(): Response1<{a: number}> {
    return { code: messageCodeMap.ok, data: {a: 1}};
  }

  getHello1(): Response1<{a: number}> {
    return { code: messageCodeMap.user_not_have_limit, data: null};
  }
}
