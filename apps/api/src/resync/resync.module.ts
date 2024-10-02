import { Module } from '@nestjs/common';
import { ResyncController } from './resync.controller';
import { ListenerModule } from 'src/listener/listener.module';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  imports: [ListenerModule],
  controllers: [ResyncController],
  providers: [PrismaService],
})
export class ResyncModule { }
