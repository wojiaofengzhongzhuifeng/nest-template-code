import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../common/entities/base-entity";


@Entity()
export class OrderEntity extends BaseEntity{


  @Column()
  responseInfo: string
}


