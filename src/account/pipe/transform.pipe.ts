import {
  ArgumentMetadata,
  Injectable,
  PipeTransform
} from "@nestjs/common";

@Injectable()
export class TransformPipe implements PipeTransform<any> {
  async transform(value, metadata: ArgumentMetadata) {


    const {goodTypeId} = value

    const test = parseInt(goodTypeId)
    
    
    return {...value, goodTypeId: test}

  }


}