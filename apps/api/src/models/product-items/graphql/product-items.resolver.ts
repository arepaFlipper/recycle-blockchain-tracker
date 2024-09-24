import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { ProductItemsService } from './product-items.service'
import { ProductItem } from './entity/product-item.entity'
import { FindManyProductItemArgs, FindUniqueProductItemArgs } from './dtos/find.args'
import { CreateProductItemInput } from './dtos/create-product-item.input'
import { UpdateProductItemInput } from './dtos/update-product-item.input'
import { checkRowLevelPermission } from 'src/common/auth/util'
import { GetUserType } from 'src/common/types'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Resolver(() => ProductItem)
export class ProductItemsResolver {
  constructor(private readonly productItemsService: ProductItemsService,
    private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @Mutation(() => ProductItem)
  createProductItem(@Args('createProductItemInput') args: CreateProductItemInput, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, args.uid)
    return this.productItemsService.create(args)
  }

  @Query(() => [ProductItem], { name: 'productItems' })
  findAll(@Args() args: FindManyProductItemArgs) {
    return this.productItemsService.findAll(args)
  }

  @Query(() => ProductItem, { name: 'productItem' })
  findOne(@Args() args: FindUniqueProductItemArgs) {
    return this.productItemsService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => ProductItem)
  async updateProductItem(@Args('updateProductItemInput') args: UpdateProductItemInput, @GetUser() user: GetUserType) {
    const productItem = await this.prisma.productItem.findUnique({ where: { id: args.id } })
    checkRowLevelPermission(user, productItem.uid)
    return this.productItemsService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => ProductItem)
  async removeProductItem(@Args() args: FindUniqueProductItemArgs, @GetUser() user: GetUserType) {
    const productItem = await this.prisma.productItem.findUnique(args)
    checkRowLevelPermission(user, productItem.uid)
    return this.productItemsService.remove(args)
  }
}
