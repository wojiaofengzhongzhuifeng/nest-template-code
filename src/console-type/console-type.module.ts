import { Module } from '@nestjs/common';
import { ConsoleTypeService } from './console-type.service';
import { ConsoleTypeController } from './console-type.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConsoleType } from "./entities/console-type.entity";

@Module({
  controllers: [ConsoleTypeController],
  imports: [TypeOrmModule.forFeature([ConsoleType])],
  providers: [ConsoleTypeService],
})
export class ConsoleTypeModule {}
