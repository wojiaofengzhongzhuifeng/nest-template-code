import { Injectable } from '@nestjs/common';
import { CreateGoodTypeDto } from './dto/create-good-type.dto';
import { UpdateGoodTypeDto } from './dto/update-good-type.dto';

@Injectable()
export class GoodTypeService {
  create(createGoodTypeDto: CreateGoodTypeDto) {
    return 'This action adds a new goodType';
  }

  findAll() {
    return `This action returns all goodType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} goodType`;
  }

  update(id: number, updateGoodTypeDto: UpdateGoodTypeDto) {
    return `This action updates a #${id} goodType`;
  }

  remove(id: number) {
    return `This action removes a #${id} goodType`;
  }
}
