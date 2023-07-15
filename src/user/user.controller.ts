import {Controller, Get, Post, Body, Patch, Param, Delete, Query, Put} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {PaginationPipe} from "../common/pipes/pagination.pipe";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findPagination(
    @Query(new PaginationPipe()) {page, limit}: { page: number; limit: number },
  ) {
    console.log('test', typeof limit, page);

    return this.userService.findPagination((page), (limit));
  }

  @Get(':userId')
  async getInfoById(@Param('userId') userId: number){
    return this.userService.getInfoById(userId);
  }

  @Put(':userId')
  async updateById(
    @Param('userId') userId: number,
    @Body() updateUserDto: UpdateUserDto
  ){
    return this.userService.updateById(userId, updateUserDto)
  }
}
