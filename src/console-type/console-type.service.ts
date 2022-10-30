import { Injectable } from '@nestjs/common';
import { CreateConsoleTypeDto } from './dto/create-console-type.dto';
import { UpdateConsoleTypeDto } from './dto/update-console-type.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { ConsoleType } from "./entities/console-type.entity";
import { Repository } from "typeorm";
import { baseResponse, Result } from "../common/entities/common-response";

@Injectable()
export class ConsoleTypeService {
  constructor(
    @InjectRepository(ConsoleType)
    private readonly consoleTypeRepository: Repository<ConsoleType>
  ) {}


  async create(createConsoleTypeDto: CreateConsoleTypeDto) {
    const createConsoleType = new ConsoleType()
    const date = new Date()
    createConsoleType.creation = date
    createConsoleType.modification = date
    createConsoleType.name = createConsoleTypeDto.name

    try {
      const result = await this.consoleTypeRepository.save(createConsoleType)
      return { ...baseResponse, data: result }
    } catch (e){
      return {...baseResponse, result: Result.error, message: e}
    }
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
