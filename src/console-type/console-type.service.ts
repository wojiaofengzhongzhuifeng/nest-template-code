import { Injectable } from '@nestjs/common';
import { CreateConsoleTypeDto } from './dto/create-console-type.dto';
import { UpdateConsoleTypeDto } from './dto/update-console-type.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { ConsoleType } from "./entities/console-type.entity";
import { Repository } from "typeorm";
import { baseResponse, Result } from "../common/entities/common-response";
import {isEmpty} from "../common/utils";
import {IntervalException, RequestDataException} from "../custom-http-exception";

@Injectable()
export class ConsoleTypeService {
  constructor(
    @InjectRepository(ConsoleType)
    private readonly consoleTypeRepository: Repository<ConsoleType>
  ) {}


  async create(createConsoleTypeDto: CreateConsoleTypeDto) {

    const {name} = createConsoleTypeDto

    let sql = `
      SELECT * FROM console_type WHERE NAME = "${name}"
    `

    const sqlResult = await this.consoleTypeRepository.query(sql)

    if(!isEmpty(sqlResult)){
      throw new RequestDataException('console type name exist')
    }

    console.log('sqlResult', sqlResult);

    const createConsoleType = new ConsoleType()
    const date = new Date()
    createConsoleType.creation = date
    createConsoleType.modification = date
    createConsoleType.name = createConsoleTypeDto.name

    // todo 是否能删除try  catch?
    try {
      const result = await this.consoleTypeRepository.save(createConsoleType)
      return { ...baseResponse, data: result } // todo 正常数据返回，返回 200 http code
    } catch (e){
      throw new IntervalException('add console type data error')
    }
  }

  async findAll() {
    try {
      const result = await this.consoleTypeRepository.find()
      console.log('result', result);
      return { ...baseResponse, data: result }
    } catch (e) {
      return { ...baseResponse, result: Result.error, message: e }
    }

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
