import { Injectable } from '@nestjs/common';
import {MessageCodeMap, Response1} from "./common/interceptors/response.interceptor";
import {RequestException} from "./common/exceptions/request.exception";
import {InternalErrorException} from "./common/exceptions/internal-error.exception";
import {CustomError} from "./common/exceptions/custom-error";

@Injectable()
export class AppService {


  // 正常业务响应情况
  getHello(): Response1<{a: number}> {
    return { code: MessageCodeMap.ok, data: {a: 1}};
  }

  // 错误响应：不推荐使用
  getHello1(): Response1<{a: number}> {
    return { code: MessageCodeMap.user_not_have_limit, data: null};
  }

  // 错误响应：客户端出现请求错误
  getHello2(): Response1<{a: number}> {

    throw new RequestException('客户端请求错误');
    // return { code: messageCodeMap.user_not_have_limit, data: null};
  }

  // 错误响应：服务端内部出现请求错误
  getHello3(): Response1<{a: number}> {

    throw new InternalErrorException('服务端请求错误');
  }


  // 错误响应：出现错误，并且需要在前端精确展示错误
  getHello4(): Response1<{a: number}> {

    throw new CustomError(MessageCodeMap.user_not_have_limit, '自定义错误');
  }
}
