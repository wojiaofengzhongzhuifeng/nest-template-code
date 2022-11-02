import { BaseEntity } from "../../common/entities/base-entity";
import { Column, Entity } from "typeorm";


@Entity()
export class GoodType extends BaseEntity{
  @Column()
  name: string

  // 注意： 这个字段保存的实际金额 * 100 ，如现实情况是 12.13 元，保存到数据库的数据为 1213
  @Column()
  price: number

  @Column()
  consoleTypeId: number
}
