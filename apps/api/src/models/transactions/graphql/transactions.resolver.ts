import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { TransactionsService } from './transactions.service'
import { Transaction } from './entity/transaction.entity'
import { FindManyTransactionArgs, FindUniqueTransactionArgs } from './dtos/find.args'
import { CreateTransactionInput } from './dtos/create-transaction.input'
import { UpdateTransactionInput } from './dtos/update-transaction.input'
import { checkRowLevelPermission } from 'src/common/auth/util'
import { GetUserType } from 'src/common/types'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Resolver(() => Transaction)
export class TransactionsResolver {
  constructor(private readonly transactionsService: TransactionsService,
    private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @Mutation(() => Transaction)
  createTransaction(@Args('createTransactionInput') args: CreateTransactionInput, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, args.uid)
    return this.transactionsService.create(args)
  }

  @Query(() => [Transaction], { name: 'transactions' })
  findAll(@Args() args: FindManyTransactionArgs) {
    return this.transactionsService.findAll(args)
  }

  @Query(() => Transaction, { name: 'transaction' })
  findOne(@Args() args: FindUniqueTransactionArgs) {
    return this.transactionsService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Transaction)
  async updateTransaction(@Args('updateTransactionInput') args: UpdateTransactionInput, @GetUser() user: GetUserType) {
    const transaction = await this.prisma.transaction.findUnique({ where: { id: args.id } })
    checkRowLevelPermission(user, transaction.uid)
    return this.transactionsService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Transaction)
  async removeTransaction(@Args() args: FindUniqueTransactionArgs, @GetUser() user: GetUserType) {
    const transaction = await this.prisma.transaction.findUnique(args)
    checkRowLevelPermission(user, transaction.uid)
    return this.transactionsService.remove(args)
  }
}
