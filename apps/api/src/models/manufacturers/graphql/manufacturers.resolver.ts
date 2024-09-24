import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { ManufacturersService } from './manufacturers.service'
import { Manufacturer } from './entity/manufacturer.entity'
import { FindManyManufacturerArgs, FindUniqueManufacturerArgs } from './dtos/find.args'
import { CreateManufacturerInput } from './dtos/create-manufacturer.input'
import { UpdateManufacturerInput } from './dtos/update-manufacturer.input'
import { checkRowLevelPermission } from 'src/common/auth/util'
import { GetUserType } from 'src/common/types'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Resolver(() => Manufacturer)
export class ManufacturersResolver {
  constructor(private readonly manufacturersService: ManufacturersService,
    private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @Mutation(() => Manufacturer)
  createManufacturer(@Args('createManufacturerInput') args: CreateManufacturerInput, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, args.uid)
    return this.manufacturersService.create(args)
  }

  @Query(() => [Manufacturer], { name: 'manufacturers' })
  findAll(@Args() args: FindManyManufacturerArgs) {
    return this.manufacturersService.findAll(args)
  }

  @Query(() => Manufacturer, { name: 'manufacturer' })
  findOne(@Args() args: FindUniqueManufacturerArgs) {
    return this.manufacturersService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Manufacturer)
  async updateManufacturer(@Args('updateManufacturerInput') args: UpdateManufacturerInput, @GetUser() user: GetUserType) {
    const manufacturer = await this.prisma.manufacturer.findUnique({ where: { id: args.id } })
    checkRowLevelPermission(user, manufacturer.uid)
    return this.manufacturersService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Manufacturer)
  async removeManufacturer(@Args() args: FindUniqueManufacturerArgs, @GetUser() user: GetUserType) {
    const manufacturer = await this.prisma.manufacturer.findUnique(args)
    checkRowLevelPermission(user, manufacturer.uid)
    return this.manufacturersService.remove(args)
  }
}
