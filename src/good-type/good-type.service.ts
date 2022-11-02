import { Inject, Injectable } from "@nestjs/common";
import { CreateGoodTypeDto } from "./dto/create-good-type.dto";
import { UpdateGoodTypeDto } from "./dto/update-good-type.dto";
import { GoodType } from "./entities/good-type.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  BaseResponse,
  baseResponse,
  codeMap,
  Result
} from "../common/entities/common-response";
import { GoodTypeVo } from "./vo/good-type.vo";
import { BuyGoodTypeDto } from "./dto/buy-good-type.dto";
import { AccountService } from "../account/account.service";

@Injectable()
export class GoodTypeService {
  @Inject(AccountService)
  private readonly accountService: AccountService;

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

  async buyGood(buyGoodTypeDto: BuyGoodTypeDto) {
    try {
      const { goodTypeId, wantByNumber, email } = buyGoodTypeDto

      const remainGoodTypeNumberSql = `
          SELECT good_type.id,
                 count(*) as remainAmount
          FROM good_type
                   INNER JOIN account ON account.goodTypeId = good_type.id
          where good_type.consoleTypeId = ${goodTypeId}
            and account.owner = ""
          group by id;
      `
      const remainGoodTypeNumberResult = await this.goodTypeRepository.query(remainGoodTypeNumberSql)

      if(remainGoodTypeNumberResult.length !== 1 ){throw new Error(codeMap.goodType存在相同数据id)}
      if(wantByNumber > remainGoodTypeNumberResult[0].remainAmount ){throw new Error(codeMap.购买good数量超出最大库存)}

      // todo 接入支付宝接口
      await this.alipay()
      const updateResult = await this.accountService.updateAccountOwner(buyGoodTypeDto)
      return {...baseResponse, data: updateResult}
    } catch (errorCode) {
      const message = this.getKeyByValue(codeMap, errorCode)
      return {...baseResponse, code: errorCode, Result: Result.error, message}
    }
  }

  alipay(){
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolve(1)
        let math = Math.random()
        if(math >=0.5){
          resolve(math)
        } else {
          reject(math)
        }
      }, 1000)
    })
  }

  getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value) || 'unknown error';
  }
}
