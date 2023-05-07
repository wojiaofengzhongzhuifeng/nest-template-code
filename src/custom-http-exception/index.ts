import { HttpException, HttpStatus } from "@nestjs/common";


// todo http code 的最佳实践是什么？
// 业务错误map
export declare enum CustomErrorStatus {
  LACK_REQUEST_DATA = 400001, // 缺少请求数据
}


export class RequestDataException extends HttpException {
  constructor(errorMessage) {
    // super(`lack ${requestDataKey}`, CustomErrorStatus.LACK_REQUEST_DATA);
    
    // super({
    //   message1234567: `lack ${requestDataKey}`,
    //   result: 'fdsafasd'
    // }, HttpStatus.BAD_REQUEST);

    super(`${errorMessage}`, HttpStatus.BAD_REQUEST);
  }
}