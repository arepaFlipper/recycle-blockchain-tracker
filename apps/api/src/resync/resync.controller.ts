import { Controller, Get } from '@nestjs/common';

@Controller('resync')
export class ResyncController {
  @Get()
  getHello(): string {
    return 'Resyncing DB'
  }
}
