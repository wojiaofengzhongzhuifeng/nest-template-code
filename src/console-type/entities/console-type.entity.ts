import { BaseEntity } from "../../common/entities/base-entity";
import { Column, OneToMany } from "typeorm";
import { GoodType } from "../../good-type/entities/good-type.entity";

export class ConsoleType extends BaseEntity{
  @Column()
  name: string
}
