// base.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { LoggerInterface } from '../log/logger.interface';

@Injectable()
export class BaseService {
  constructor(@Inject('LoggerInterface') protected readonly logger: LoggerInterface) {}
}
