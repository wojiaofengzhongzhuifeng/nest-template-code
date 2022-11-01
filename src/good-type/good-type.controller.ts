import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { GoodTypeService } from './good-type.service';
import { CreateGoodTypeDto } from './dto/create-good-type.dto';
import { UpdateGoodTypeDto } from './dto/update-good-type.dto';

@Controller('good-type')
export class GoodTypeController {
  constructor(private readonly goodTypeService: GoodTypeService) {}

  @Post()
  create(@Body() createGoodTypeDto: CreateGoodTypeDto) {
    return this.goodTypeService.create(createGoodTypeDto);
  }

  @Get()
  findByConsoleTypeId(@Query() query: any) {
    const {consoleTypeId} = query
    return this.goodTypeService.findByConsoleTypeId(+consoleTypeId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGoodTypeDto: UpdateGoodTypeDto) {
    return this.goodTypeService.update(+id, updateGoodTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goodTypeService.remove(+id);
  }
}
