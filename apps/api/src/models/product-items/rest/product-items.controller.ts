import {
  Controller, Get, Post, Body, Patch, Param, Delete, Query
} from '@nestjs/common'

import { PrismaService } from 'src/common/prisma/prisma.service'
import { ApiTags } from '@nestjs/swagger'
import { CreateProductItem } from './dtos/create.dto'
import { ProductItemQueryDto } from './dtos/query.dto'
import { UpdateProductItem } from './dtos/update.dto'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger'
import { ProductItemEntity } from './entity/productItem.entity'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { GetUserType } from 'src/common/types'
import { checkRowLevelPermission } from 'src/common/auth/util'


@ApiTags('product-items')
@Controller('product-items')
export class ProductItemsController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ProductItemEntity })
  @Post()
  create(@Body() createProductItemDto: CreateProductItem, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, createProductItemDto.uid)
    return this.prisma.productItem.create({ data: createProductItemDto })
  }

  @ApiOkResponse({ type: [ProductItemEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: ProductItemQueryDto) {
    return this.prisma.productItem.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    })
  }

  @ApiOkResponse({ type: ProductItemEntity })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.prisma.productItem.findUnique({ where: { id } })
  }

  @ApiOkResponse({ type: ProductItemEntity })
  @ApiBearerAuth()
  @AllowAuthenticated()
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductItemDto: UpdateProductItem,
    @GetUser() user: GetUserType,
  ) {
    const productItem = await this.prisma.productItem.findUnique({ where: { id } })
    checkRowLevelPermission(user, productItem.uid)
    return this.prisma.productItem.update({
      where: { id },
      data: updateProductItemDto,
    })
  }

  @ApiBearerAuth()
  @AllowAuthenticated()
  @Delete(':id')
  async remove(@Param('id') id: number, @GetUser() user: GetUserType) {
    const productItem = await this.prisma.productItem.findUnique({ where: { id } })
    checkRowLevelPermission(user, productItem.uid)
    return this.prisma.productItem.delete({ where: { id } })
  }
}
