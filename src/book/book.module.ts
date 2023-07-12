import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Author} from "../author/entities/author.entity";
import {Book} from "./entities/book.entity";
import {ElasticsearchModule} from "@nestjs/elasticsearch";

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author]), ElasticsearchModule],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
