import { Module } from '@nestjs/common';
import { GoodTypeService } from './good-type.service';
import { GoodTypeController } from './good-type.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { GoodType } from "./entities/good-type.entity";
import { AccountModule } from "../account/account.module";

@Module({
  controllers: [GoodTypeController],
  providers: [GoodTypeService],
  imports: [TypeOrmModule.forFeature([GoodType]), AccountModule, ],

})
export class GoodTypeModule {}
