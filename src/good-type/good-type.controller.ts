import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { GoodTypeService } from './good-type.service';
import { CreateGoodTypeDto } from './dto/create-good-type.dto';
import { UpdateGoodTypeDto } from './dto/update-good-type.dto';
import { BaseResponse } from "../common/entities/common-response";
import { GoodTypeVo } from "./vo/good-type.vo";
import { BuyGoodTypeDto } from "./dto/buy-good-type.dto";

@Controller('good-type')
export class GoodTypeController {
  constructor(private readonly goodTypeService: GoodTypeService) {}

  @Post()
  create(@Body() createGoodTypeDto: CreateGoodTypeDto) {
    return this.goodTypeService.create(createGoodTypeDto);
  }

  // todo 核心接口，仔细检查逻辑
  @Get()
  findByConsoleTypeId(@Query() query: any):Promise<BaseResponse<GoodTypeVo[]>> {
    const {consoleTypeId} = query
    return this.goodTypeService.findByConsoleTypeId(+consoleTypeId);
  }


  @Patch('buy')
  buyGood(@Body() buyGood: BuyGoodTypeDto){
    return this.goodTypeService.buyGood(buyGood)
  }

}
