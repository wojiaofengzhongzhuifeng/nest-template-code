import { Injectable } from "@nestjs/common";
import { CreateGoodTypeDto } from "./dto/create-good-type.dto";
import { UpdateGoodTypeDto } from "./dto/update-good-type.dto";
import { GoodType } from "./entities/good-type.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { baseResponse, Result } from "../common/entities/common-response";

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
