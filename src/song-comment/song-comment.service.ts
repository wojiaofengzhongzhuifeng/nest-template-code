import { Injectable } from '@nestjs/common';
import { CreateSongCommentDto } from './dto/create-song-comment.dto';
import { UpdateSongCommentDto } from './dto/update-song-comment.dto';
import { SongComment } from "./entities/song-comment.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class SongCommentService {
  constructor(
    @InjectRepository(SongComment)
    private readonly songCommentRepository: Repository<SongComment>,
  ) {}


  // // 调用 ali SDK ，生成支付链接
  // createAlipayUrl(createAlipayUrlDto: CreateAlipayUrlDto){
  //
  // }


  // create(createSongCommentDto: CreateSongCommentDto) {
  //   const time = new Date();
  //
  //   const songComment = new SongComment();
  //   songComment.source = createSongCommentDto.source;
  //   songComment.comment = createSongCommentDto.comment;
  //   songComment.extraComment = createSongCommentDto?.extraComment || "";
  //   songComment.externalId = createSongCommentDto.externalId;
  //   songComment.creation = time;
  //   songComment.modification = time;
  //   songComment.type = createSongCommentDto.type;
  //   return this.songCommentRepository.save(songComment);
  // }
  //
  // findAll() {
  //   return `This action returns all songComment`;
  // }
  //
  // findOne(id: number) {
  //   return `This action returns a #${id} songComment`;
  // }
  //
  // update(id: number, updateSongCommentDto: UpdateSongCommentDto) {
  //   return `This action updates a #${id} songComment`;
  // }
  //
  // remove(externalId: string) {
  //   const deleteSQL = `DELETE FROM song_comment WHERE externalId = "${externalId}";`
  //   return this.songCommentRepository.query(deleteSQL)
  // }
}
