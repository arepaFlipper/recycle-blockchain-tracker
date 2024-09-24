import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { ToxicItemsService } from './toxic-items.service'
import { ToxicItem } from './entity/toxic-item.entity'
import { FindManyToxicItemArgs, FindUniqueToxicItemArgs } from './dtos/find.args'
import { CreateToxicItemInput } from './dtos/create-toxic-item.input'
import { UpdateToxicItemInput } from './dtos/update-toxic-item.input'
import { checkRowLevelPermission } from 'src/common/auth/util'
import { GetUserType } from 'src/common/types'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Resolver(() => ToxicItem)
export class ToxicItemsResolver {
  constructor(private readonly toxicItemsService: ToxicItemsService,
    private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @Mutation(() => ToxicItem)
  createToxicItem(@Args('createToxicItemInput') args: CreateToxicItemInput, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, args.uid)
    return this.toxicItemsService.create(args)
  }

  @Query(() => [ToxicItem], { name: 'toxicItems' })
  findAll(@Args() args: FindManyToxicItemArgs) {
    return this.toxicItemsService.findAll(args)
  }

  @Query(() => ToxicItem, { name: 'toxicItem' })
  findOne(@Args() args: FindUniqueToxicItemArgs) {
    return this.toxicItemsService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => ToxicItem)
  async updateToxicItem(@Args('updateToxicItemInput') args: UpdateToxicItemInput, @GetUser() user: GetUserType) {
    const toxicItem = await this.prisma.toxicItem.findUnique({ where: { id: args.id } })
    checkRowLevelPermission(user, toxicItem.uid)
    return this.toxicItemsService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => ToxicItem)
  async removeToxicItem(@Args() args: FindUniqueToxicItemArgs, @GetUser() user: GetUserType) {
    const toxicItem = await this.prisma.toxicItem.findUnique(args)
    checkRowLevelPermission(user, toxicItem.uid)
    return this.toxicItemsService.remove(args)
  }
}
