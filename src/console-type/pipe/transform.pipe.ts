import {
  ArgumentMetadata,
  Injectable,
  PipeTransform
} from "@nestjs/common";
import {CreateConsoleTypeDto} from "../dto/create-console-type.dto";

@Injectable()
export class TransformPipe implements PipeTransform<any> {
  async transform(value: CreateConsoleTypeDto, metadata: ArgumentMetadata) {

    return {
      ...value,
    }

  }


}
