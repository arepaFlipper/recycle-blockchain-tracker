import {
  Controller, Get, Post, Body, Patch, Param, Delete, Query
} from '@nestjs/common'

import { PrismaService } from 'src/common/prisma/prisma.service'
import { ApiTags } from '@nestjs/swagger'
import { CreateToxicItem } from './dtos/create.dto'
import { ToxicItemQueryDto } from './dtos/query.dto'
import { UpdateToxicItem } from './dtos/update.dto'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger'
import { ToxicItemEntity } from './entity/toxicItem.entity'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { GetUserType } from 'src/common/types'
import { checkRowLevelPermission } from 'src/common/auth/util'


@ApiTags('toxic-items')
@Controller('toxic-items')
export class ToxicItemsController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ToxicItemEntity })
  @Post()
  create(@Body() createToxicItemDto: CreateToxicItem, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, createToxicItemDto.uid)
    return this.prisma.toxicItem.create({ data: createToxicItemDto })
  }

  @ApiOkResponse({ type: [ToxicItemEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: ToxicItemQueryDto) {
    return this.prisma.toxicItem.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    })
  }

  @ApiOkResponse({ type: ToxicItemEntity })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.prisma.toxicItem.findUnique({ where: { id } })
  }

  @ApiOkResponse({ type: ToxicItemEntity })
  @ApiBearerAuth()
  @AllowAuthenticated()
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateToxicItemDto: UpdateToxicItem,
    @GetUser() user: GetUserType,
  ) {
    const toxicItem = await this.prisma.toxicItem.findUnique({ where: { id } })
    checkRowLevelPermission(user, toxicItem.uid)
    return this.prisma.toxicItem.update({
      where: { id },
      data: updateToxicItemDto,
    })
  }

  @ApiBearerAuth()
  @AllowAuthenticated()
  @Delete(':id')
  async remove(@Param('id') id: number, @GetUser() user: GetUserType) {
    const toxicItem = await this.prisma.toxicItem.findUnique({ where: { id } })
    checkRowLevelPermission(user, toxicItem.uid)
    return this.prisma.toxicItem.delete({ where: { id } })
  }
}
