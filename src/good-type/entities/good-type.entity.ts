import { BaseEntity } from "../../common/entities/base-entity";
import { Column, Entity } from "typeorm";


@Entity()
export class GoodType extends BaseEntity{
  @Column()
  name: string

  // todo 支持两位小数金额
  @Column()
  price: number

  @Column()
  consoleTypeId: number
}
