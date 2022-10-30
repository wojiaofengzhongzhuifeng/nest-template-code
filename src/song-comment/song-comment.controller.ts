import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SongCommentService } from './song-comment.service';
import { CreateSongCommentDto } from './dto/create-song-comment.dto';
import { UpdateSongCommentDto } from './dto/update-song-comment.dto';
import AlipayForm from 'alipay-sdk/lib/form'
import alipaySdk from "../common/config/alipayConfig";
// import dayjs from 'dayjs' // ES 2015
const dayjs = require('dayjs')


@Controller('song-comment')
export class SongCommentController {
  constructor(private readonly songCommentService: SongCommentService) {}

  @Get()
  async createAlipayUrl() {
    // 实例化 AlipayForm
    const formData = new AlipayForm()

    console.log('dayjs().format("yyyy-MM-dd HH:mm:ss")', dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'));


    formData.setMethod('get');

    formData.addField('bizContent', {

      outTradeNo: 'out_trade_no',

      productCode: 'FAST_INSTANT_TRADE_PAY',

      totalAmount: '0.01',

      subject: '商品',

      body: '商品详情',

    });

    formData.addField('notifyUrl', 'https://www.baid.com');

    const response = await alipaySdk.exec(

      'alipay.trade.page.pay',

      {},

      { formData: formData },

    )

    return response

    // // 返回一个 json 格式的数据
    // res.json({
    //   code: reult
    // })

  }


  // @Post()
  // create(@Body() createSongCommentDto: CreateSongCommentDto) {
  //   return this.songCommentService.create(createSongCommentDto);
  // }
  //
  // @Get()
  // findAll() {
  //   return "fjdsklajfdak"
  //   return this.songCommentService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.songCommentService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSongCommentDto: UpdateSongCommentDto) {
  //   return this.songCommentService.update(+id, updateSongCommentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.songCommentService.remove(+id);
  // }
}
