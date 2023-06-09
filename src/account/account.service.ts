import {forwardRef, Get, Inject, Injectable, Param} from "@nestjs/common";
import { CreateAccountDto } from "./dto/create-account.dto";
import { UpdateAccountDto } from "./dto/update-account.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Account } from "./entities/account.entity";
import { baseResponse, BaseResponse, Result } from "../common/entities/common-response";
import { BuyGoodTypeDto } from "../good-type/dto/buy-good-type.dto";
import {GoodTypeService} from "../good-type/good-type.service";
import {isEmpty} from "../common/utils";
import {RequestDataException} from "../custom-http-exception";

@Injectable()
export class AccountService {


  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,

    @Inject(forwardRef(() => GoodTypeService))
    private goodTypeService: GoodTypeService,
  ) {}
  async create(createAccountDto: CreateAccountDto): Promise<BaseResponse<any>> {

    const {info, goodTypeId} = createAccountDto

    let goodTypeQueryResult = await this.goodTypeService.getGoodTypeById(goodTypeId)

    if(isEmpty(goodTypeQueryResult)){
      throw new RequestDataException('goodTypeId not exist');
    }


    const createAccount = new Account()
    const date = new Date()
    createAccount.creation = date
    createAccount.modification = date
    createAccount.owner = ''
    createAccount.alipay = ''
    createAccount.info = info
    createAccount.goodTypeId = goodTypeId


    // todo 删除这个try catch
    try {
      const result = await this.accountRepository.save(createAccount)
      return { ...baseResponse, data: result }
    } catch (e){
      return {...baseResponse, result: Result.error, message: e}
    }
  }

  async findByGoodTypeId(goodTypeId) {
    try{
      // const result = await this.accountRepository.findAndCount({skip: 0,take:1})
      const result = await this.accountRepository.findBy({goodTypeId})



      return {...baseResponse, data: result}
    }catch (e){
      return {...baseResponse, result: Result.error, message: e}
    }
  }

  async updateAccountOwner(buyGoodTypeDto: BuyGoodTypeDto): Promise<{id: number, info: string}[]>{
    const { goodTypeId, wantByNumber, email } = buyGoodTypeDto

    const affectIdSql = `
      SELECT id, info from account WHERE goodTypeId=${goodTypeId} and OWNER = '' LIMIT ${wantByNumber};
    `
    const affectIdSqlResult = await this.accountRepository.query(affectIdSql)
    const needUpdateAccountIdListString = affectIdSqlResult.map((item)=>item.id).join(',')

    const accountWithNoOwnerSql = `
        UPDATE account SET owner = '${email}' WHERE id in (${needUpdateAccountIdListString});
    `
    const updateAccountResult = await this.accountRepository.query(accountWithNoOwnerSql)
    if(updateAccountResult.affectedRows !== wantByNumber){throw new Error("更新owner出现错误")}

    return affectIdSqlResult
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
