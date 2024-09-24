import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class ToxicItemOrderByWithRelationInputStrict
  implements RestrictProperties<ToxicItemOrderByWithRelationInputStrict, Prisma.ToxicItemOrderByWithRelationInput>
{
  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}


@InputType()
export class ToxicItemOrderByWithRelationInput extends PartialType(
  ToxicItemOrderByWithRelationInputStrict,
) {}

@InputType()
export class ToxicItemOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder
}
