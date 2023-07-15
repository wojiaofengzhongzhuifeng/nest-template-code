import {Controller, Get, Post, Body, Patch, Param, Delete, Query, Put} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {PaginationPipe} from "../common/pipes/pagination.pipe";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 创建用户
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @Get()
  // findPagination(
  //   @Query(new PaginationPipe()) {page, limit}: { page: number; limit: number },
  // ) {
  //   console.log('test', typeof limit, page);
  //
  //   return this.userService.findPagination((page), (limit));
  // }

  // 获取用户信息
  @Get(':userId')
  async getInfoById(@Param('userId') userId: number){
    return this.userService.getInfoById(userId);
  }


  // 更新用户信息
  @Put(':userId')
  async updateById(
    @Param('userId') userId: number,
    @Body() updateUserDto: UpdateUserDto
  ){
    return this.userService.updateById(userId, updateUserDto)
  }
}
