import { Injectable } from "@nestjs/common";
import { CreateGoodTypeDto } from "./dto/create-good-type.dto";
import { UpdateGoodTypeDto } from "./dto/update-good-type.dto";
import { GoodType } from "./entities/good-type.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseResponse, baseResponse, Result } from "../common/entities/common-response";
import { GoodTypeVo } from "./vo/good-type.vo";

@Injectable()
export class GoodTypeService {

  constructor(
    @InjectRepository(GoodType)
    private readonly goodTypeRepository: Repository<GoodType>,
  ) {}

  async create(createGoodTypeDto: CreateGoodTypeDto) {

    // todo:特殊情况：检查 createGoodTypeDto.consoleTypeId 是否存在

    const createGoodType = new GoodType()
    const date = new Date()
    createGoodType.creation = date
    createGoodType.modification = date
    createGoodType.name = createGoodTypeDto.name
    createGoodType.price = createGoodTypeDto.price
    createGoodType.consoleTypeId = createGoodTypeDto.consoleTypeId

    try {
      const result = await this.goodTypeRepository.save(createGoodType)
      return {...baseResponse, data: result}
    }catch (e){
      return {...baseResponse, result: Result.error, message: e}
    }
  }

  async findByConsoleTypeId(consoleTypeId: number):Promise<BaseResponse<GoodTypeVo[]>> {
    try {
      const sql = `
          SELECT
              good_type.id,
              good_type.creation,
              good_type.name,
              good_type.price,
              count(*) as remainAmount
          FROM good_type INNER JOIN account ON account.goodTypeId = good_type.id where good_type.consoleTypeId = ${consoleTypeId} and account.owner = "" group by id;
      `
      const result = await this.goodTypeRepository.query(sql);

      // todo result 是对象数据，对象内部的 remainAmount 是 string 类型，期待修改为number类型
      return { ...baseResponse, data: result }
    } catch (e) {
      return { ...baseResponse, result: Result.error, message: e }
    }
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
