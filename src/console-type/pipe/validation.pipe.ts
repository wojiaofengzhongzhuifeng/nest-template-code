import {
  ArgumentMetadata,
  HttpException, HttpStatus,
  Injectable,
  NotFoundException,
  PipeTransform
} from "@nestjs/common";
import { CustomErrorStatus, RequestDataException } from "../../custom-http-exception";
import {CreateConsoleTypeDto} from "../dto/create-console-type.dto";
import {isEmpty} from "../../common/utils";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: CreateConsoleTypeDto, metadata: ArgumentMetadata) {

    const {name} = value
    if(isEmpty(name)){
      throw new RequestDataException('need name value');
    }


    return value

  }

  // private toValidate(metatype: any): boolean {
  //   const types = [String, Boolean, Number, Array, Object];
  //   return !types.includes(metatype);
  // }
}
