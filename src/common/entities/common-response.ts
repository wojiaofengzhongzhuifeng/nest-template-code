import { Column, Entity, PrimaryGeneratedColumn, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Account } from "../../account/entities/account.entity";

export enum Result{
  ok = 'ok',
  error = 'error'
}

export interface BaseResponse<T>{
  result: Result,
  data: T,
  message: string
}

export const baseResponse:BaseResponse<any> = {
  result: Result.ok,
  data: null,
  message: ''
}
