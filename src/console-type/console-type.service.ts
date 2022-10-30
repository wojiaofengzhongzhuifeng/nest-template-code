import { Injectable } from '@nestjs/common';
import { CreateConsoleTypeDto } from './dto/create-console-type.dto';
import { UpdateConsoleTypeDto } from './dto/update-console-type.dto';

@Injectable()
export class ConsoleTypeService {
  create(createConsoleTypeDto: CreateConsoleTypeDto) {
    return 'This action adds a new consoleType';
  }

  findAll() {
    return `This action returns all consoleType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} consoleType`;
  }

  update(id: number, updateConsoleTypeDto: UpdateConsoleTypeDto) {
    return `This action updates a #${id} consoleType`;
  }

  remove(id: number) {
    return `This action removes a #${id} consoleType`;
  }
}
