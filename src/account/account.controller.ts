import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
} from "@nestjs/common";
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ValidationPipe } from './pipe/validation.pipe';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }
  @Get()
  find(){
    return "2022年11月02日18:04:25"
  }

  // @Get()
  // findAll() {
  //   return this.accountService.findByGoodId(g);
  // }

  @Get()
  findByGoodTypeId(@Query() query: any) {
    const {goodTypeId} = query
    return this.accountService.findByGoodTypeId(+goodTypeId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountService.remove(+id);
  }
}
