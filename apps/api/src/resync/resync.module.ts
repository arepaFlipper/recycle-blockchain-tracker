import { Module } from '@nestjs/common';
import { ResyncController } from './resync.controller';

@Module({
  controllers: [ResyncController]
})
export class ResyncModule { }
