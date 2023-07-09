import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Author} from "../author/entities/author.entity";
import {Repository} from "typeorm";
import {Book} from "./entities/book.entity";

@Injectable()
export class BookService {

  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}


  create(createBookDto: CreateBookDto) {
    return this.bookRepository.save(createBookDto)
  }

  findAll() {
    return `This action returns all book`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
