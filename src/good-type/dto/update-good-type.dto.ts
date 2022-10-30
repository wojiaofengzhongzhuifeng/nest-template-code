import { PartialType } from '@nestjs/mapped-types';
import { CreateGoodTypeDto } from './create-good-type.dto';

export class UpdateGoodTypeDto extends PartialType(CreateGoodTypeDto) {}
