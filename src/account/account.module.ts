import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "./entities/account.entity";

@Module({
  controllers: [AccountController],
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [AccountService],
  exports: [AccountService]
})
export class AccountModule {}
