import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {DynamicLoggerModule} from "../common/log/dynamic-logger.module";
import {LogModule} from "../common/custom-log/custom-log.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), DynamicLoggerModule.forRoot({
    // type: 'console',
    type: 'file',
    filePath: './logs/log.txt',
  }),
    LogModule
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
