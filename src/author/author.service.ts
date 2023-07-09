import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "../product/entities/product.entity";
import {Repository} from "typeorm";
import {Author} from "./entities/author.entity";

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

  findAll() {
    return `This action returns all author`;
  }

  findOne(id: number) {
    return `This action returns a #${id} author`;
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}
