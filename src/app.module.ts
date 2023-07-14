import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ScheduleModule } from "@nestjs/schedule";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {ResponseInterceptor} from "./common/interceptors/response.interceptor";
import { ProductModule } from './product/product.module';
import {Product} from "./product/entities/product.entity";
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import {Author} from "./author/entities/author.entity";
import {Book} from "./book/entities/book.entity";
import {DynamicLoggerModule} from "./common/log/dynamic-logger.module";
import {LogModule} from "./common/custom-log/custom-log.module";

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
      database: 'learn_nest',
      autoLoadEntities: true,
      synchronize: true, // todo 生产环境设置为 false
      entities: [Product, Author, Book],
    }),
    ScheduleModule.forRoot(),
    ProductModule,
    AuthorModule,
    BookModule,
    DynamicLoggerModule.forRoot({
      type: 'console',
      // type: 'file',
      // filePath: './log.txt',
    }),
    LogModule,
  ],
  controllers: [AppController],
  providers: [
    // 注册拦截器
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    }
  ,AppService],
})
export class AppModule {}
