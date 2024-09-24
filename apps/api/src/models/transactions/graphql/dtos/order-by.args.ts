import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class TransactionOrderByWithRelationInputStrict
  implements RestrictProperties<TransactionOrderByWithRelationInputStrict, Prisma.TransactionOrderByWithRelationInput>
{
  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}


@InputType()
export class TransactionOrderByWithRelationInput extends PartialType(
  TransactionOrderByWithRelationInputStrict,
) {}

@InputType()
export class TransactionOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder
}
