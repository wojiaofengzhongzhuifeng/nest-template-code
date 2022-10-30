import { BaseEntity } from "../../common/entities/base-entity";
import { Column, Entity, OneToMany } from "typeorm";
import { GoodType } from "../../good-type/entities/good-type.entity";


@Entity()
export class ConsoleType extends BaseEntity{
  @Column()
  name: string
}
