import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class TransactionWhereUniqueInput {
  id: number
}

@InputType()
export class TransactionWhereInputStrict implements RestrictProperties<TransactionWhereInputStrict, Prisma.TransactionWhereInput> {
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: TransactionWhereInput[]
  OR: TransactionWhereInput[]
  NOT: TransactionWhereInput[]
}

@InputType()
export class TransactionWhereInput extends PartialType(
  TransactionWhereInputStrict,
) {}

@InputType()
export class TransactionListRelationFilter {
  every?: TransactionWhereInput
  some?: TransactionWhereInput
  none?: TransactionWhereInput
}

@InputType()
export class TransactionRelationFilter {
  is?: TransactionWhereInput
  isNot?: TransactionWhereInput
}
