import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Author} from "./entities/author.entity";
import {DynamicLoggerModule} from "../common/log/dynamic-logger.module";

@Module({
  imports: [TypeOrmModule.forFeature([Author]), DynamicLoggerModule.forRoot({
    // type: 'console',
    type: 'file',
    filePath: './logs/log.txt',
  }),],
  controllers: [AuthorController],
  providers: [AuthorService]
})
export class AuthorModule {}
