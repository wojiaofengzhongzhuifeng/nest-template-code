import { Module } from '@nestjs/common';
import { GoodTypeService } from './good-type.service';
import { GoodTypeController } from './good-type.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { GoodType } from "./entities/good-type.entity";

@Module({
  controllers: [GoodTypeController],
  providers: [GoodTypeService],
  imports: [TypeOrmModule.forFeature([GoodType])],

})
export class GoodTypeModule {}
