import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "../product/entities/product.entity";
import {Repository} from "typeorm";
import {Author} from "./entities/author.entity";
import {queryEntityPagination} from "../common/utils";
import {RequestException} from "../common/exceptions/request.exception";

@Injectable()
export class AuthorService {

  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  create(createAuthorDto: CreateAuthorDto) {
    const sqlResult = this.authorRepository.save(createAuthorDto)
    return sqlResult
  }

  async findPagination(page: number, limit: number): Promise<{ items: Author[], total }> {
    console.log('page', page);
    console.log('limit', limit);
    const [items, total] = await queryEntityPagination<Author>(this.authorRepository, 'author', page, limit)
    return {items, total}
  }

  async getInfoById(id: number){
    const author = await this.authorRepository.findOne({
      where: {
        id
      }
    })

    if(!author){
      throw new RequestException('无法根据 authorId 找到数据')
    }
    return author
  }
}