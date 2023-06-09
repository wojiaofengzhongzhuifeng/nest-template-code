import {Controller, Get, Post, Body, Patch, Param, Delete, UsePipes} from '@nestjs/common';
import { ConsoleTypeService } from './console-type.service';
import { CreateConsoleTypeDto } from './dto/create-console-type.dto';
import { UpdateConsoleTypeDto } from './dto/update-console-type.dto';
import {ValidationPipe} from "./pipe/validation.pipe";
import {TransformPipe} from "./pipe/transform.pipe";

@Controller('console-type')
export class ConsoleTypeController {
  constructor(private readonly consoleTypeService: ConsoleTypeService) {}

  @UsePipes(
      ValidationPipe,
      TransformPipe
  )
  @Post()
  create(@Body() createConsoleTypeDto: CreateConsoleTypeDto) {
    return this.consoleTypeService.create(createConsoleTypeDto);
  }

  @Get()
  findAll() {
    return this.consoleTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consoleTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConsoleTypeDto: UpdateConsoleTypeDto) {
    return this.consoleTypeService.update(+id, updateConsoleTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consoleTypeService.remove(+id);
  }
}
