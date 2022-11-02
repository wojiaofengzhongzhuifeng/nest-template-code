import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SongCommentModule } from './song-comment/song-comment.module';
import { ScheduleModule } from "@nestjs/schedule";
import { Repository } from "typeorm";
import { AccountModule } from './account/account.module';
import { OrderModule } from './order/order.module';
import { ConsoleTypeModule } from './console-type/console-type.module';
import { GoodTypeModule } from './good-type/good-type.module';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      // todo 环境变量
      password: 'raojiajun111',
      database: 'account_sell',
      autoLoadEntities: true,
      // todo 环境变量
      synchronize: true, // todo 生产环境设置为 false
    }),
    SongCommentModule,
    ScheduleModule.forRoot(),
    AccountModule,
    OrderModule,
    ConsoleTypeModule,
    GoodTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
