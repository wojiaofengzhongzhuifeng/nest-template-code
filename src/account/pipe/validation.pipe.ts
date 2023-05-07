import {
  ArgumentMetadata,
  HttpException, HttpStatus,
  Injectable,
  NotFoundException,
  PipeTransform
} from "@nestjs/common";
import { CustomErrorStatus, RequestDataException } from "../../custom-http-exception";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value, metadata: ArgumentMetadata) {
    // 请求参数统一校验
    // - 必须传这两个字段
    // - info 字段 长度大于10
    // - goodTypeId 必须为数字或者数字字符串
    const {info, goodTypeId} = value
    if(!info){
      throw new RequestDataException('lack info');
    }
    if(!goodTypeId){
      throw new RequestDataException('lack goodTypeId');
    }
    if(info.length < 10){
      throw new RequestDataException('info length too short');
    }
    if(isNaN(parseInt(goodTypeId))){
      throw new RequestDataException('goodTypeId is not number');
    }
    
    
    return value
    
  }

  // private toValidate(metatype: any): boolean {
  //   const types = [String, Boolean, Number, Array, Object];
  //   return !types.includes(metatype);
  // }
}