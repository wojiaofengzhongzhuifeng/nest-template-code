import {forwardRef, Module} from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "./entities/account.entity";
import {GoodTypeModule} from "../good-type/good-type.module";

@Module({
  controllers: [AccountController],
  imports: [TypeOrmModule.forFeature([Account]), forwardRef(()=>GoodTypeModule)],
  providers: [AccountService],
  exports: [AccountService]
})
export class AccountModule {}
