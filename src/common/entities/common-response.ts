import { Column, Entity, PrimaryGeneratedColumn, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Account } from "../../account/entities/account.entity";

export enum Result{
  ok = 'ok',
  error = 'error'
}

export interface BaseResponse{
  result: Result,
  data: any,
  message: string
}

export const baseResponse:BaseResponse = {
  result: Result.ok,
  data: null,
  message: ''
}
