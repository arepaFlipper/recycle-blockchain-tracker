import {
  Controller, Get, Post, Body, Patch, Param, Delete, Query
} from '@nestjs/common'

import { PrismaService } from 'src/common/prisma/prisma.service'
import { ApiTags } from '@nestjs/swagger'
import { CreateProduct } from './dtos/create.dto'
import { ProductQueryDto } from './dtos/query.dto'
import { UpdateProduct } from './dtos/update.dto'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger'
import { ProductEntity } from './entity/product.entity'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { GetUserType } from 'src/common/types'
import { checkRowLevelPermission } from 'src/common/auth/util'


@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ProductEntity })
  @Post()
  create(@Body() createProductDto: CreateProduct, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, createProductDto.uid)
    return this.prisma.product.create({ data: createProductDto })
  }

  @ApiOkResponse({ type: [ProductEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: ProductQueryDto) {
    return this.prisma.product.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    })
  }

  @ApiOkResponse({ type: ProductEntity })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.prisma.product.findUnique({ where: { id } })
  }

  @ApiOkResponse({ type: ProductEntity })
  @ApiBearerAuth()
  @AllowAuthenticated()
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProduct,
    @GetUser() user: GetUserType,
  ) {
    const product = await this.prisma.product.findUnique({ where: { id } })
    checkRowLevelPermission(user, product.uid)
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    })
  }

  @ApiBearerAuth()
  @AllowAuthenticated()
  @Delete(':id')
  async remove(@Param('id') id: number, @GetUser() user: GetUserType) {
    const product = await this.prisma.product.findUnique({ where: { id } })
    checkRowLevelPermission(user, product.uid)
    return this.prisma.product.delete({ where: { id } })
  }
}
