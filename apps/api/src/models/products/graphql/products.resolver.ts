import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { ProductsService } from './products.service'
import { Product } from './entity/product.entity'
import { FindManyProductArgs, FindUniqueProductArgs } from './dtos/find.args'
import { CreateProductInput } from './dtos/create-product.input'
import { UpdateProductInput } from './dtos/update-product.input'
import { checkRowLevelPermission } from 'src/common/auth/util'
import { GetUserType } from 'src/common/types'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService,
    private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @Mutation(() => Product)
  createProduct(@Args('createProductInput') args: CreateProductInput, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, args.uid)
    return this.productsService.create(args)
  }

  @Query(() => [Product], { name: 'products' })
  findAll(@Args() args: FindManyProductArgs) {
    return this.productsService.findAll(args)
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args() args: FindUniqueProductArgs) {
    return this.productsService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Product)
  async updateProduct(@Args('updateProductInput') args: UpdateProductInput, @GetUser() user: GetUserType) {
    const product = await this.prisma.product.findUnique({ where: { id: args.id } })
    checkRowLevelPermission(user, product.uid)
    return this.productsService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Product)
  async removeProduct(@Args() args: FindUniqueProductArgs, @GetUser() user: GetUserType) {
    const product = await this.prisma.product.findUnique(args)
    checkRowLevelPermission(user, product.uid)
    return this.productsService.remove(args)
  }
}
