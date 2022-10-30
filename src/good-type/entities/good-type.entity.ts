import { BaseEntity } from "../../common/entities/base-entity";
import { Column, Entity } from "typeorm";


@Entity()
export class GoodType extends BaseEntity{
  @Column()
  name: string

  @Column()
  price: number

  @Column()
  consoleTypeId: number
}
