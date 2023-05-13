import {forwardRef, Module} from '@nestjs/common';
import { GoodTypeService } from './good-type.service';
import { GoodTypeController } from './good-type.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { GoodType } from "./entities/good-type.entity";
import { AccountModule } from "../account/account.module";

@Module({
  controllers: [GoodTypeController],
  imports: [TypeOrmModule.forFeature([GoodType]), forwardRef(()=>AccountModule)],
  providers: [GoodTypeService],
  exports: [GoodTypeService]
})
export class GoodTypeModule {}
