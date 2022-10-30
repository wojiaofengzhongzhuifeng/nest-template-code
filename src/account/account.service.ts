import { Injectable } from "@nestjs/common";
import { CreateAccountDto } from "./dto/create-account.dto";
import { UpdateAccountDto } from "./dto/update-account.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Account } from "./entities/account.entity";
import { baseResponse, BaseResponse, Result } from "../common/entities/common-response";

@Injectable()
export class AccountService {

  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}
  async create(createAccountDto: CreateAccountDto): Promise<BaseResponse> {

    // todo:特殊情况：检查 createAccountDto.goodTypeId 是否存在
    // const goodTypeId = createAccountDto.goodTypeId

    const createAccount = new Account()
    const date = new Date()
    createAccount.creation = date
    createAccount.modification = date
    createAccount.owner = ''
    createAccount.alipay = ''
    createAccount.info = createAccountDto.info
    createAccount.goodTypeId = createAccountDto.goodTypeId

    try {
      const result = await this.accountRepository.save(createAccount)
      return { ...baseResponse, data: result }
    } catch (e){
      return {...baseResponse, result: Result.error, message: e}
    }
  }

  findAll() {
    return `This action returns all account`;
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
