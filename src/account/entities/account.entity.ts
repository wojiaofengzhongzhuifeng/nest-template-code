import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../common/entities/base-entity";


export enum AcconutType {
  busi = 'busi',
  facebook = 'facebook'
}

@Entity()
export class Account extends BaseEntity{
  // 账号所属用户，用户是邮箱
  @Column({
    default: 'no'
  })
  owner: string

  // ?保留字段：存储alipay返回的结果
  @Column()
  alipay: string

  // 核心：账户商品信息密码
  @Column()
  info: string

  @Column()
  goodTypeId: number
}


