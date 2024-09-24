import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class ProductOrderByWithRelationInputStrict
  implements RestrictProperties<ProductOrderByWithRelationInputStrict, Prisma.ProductOrderByWithRelationInput>
{
  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}


@InputType()
export class ProductOrderByWithRelationInput extends PartialType(
  ProductOrderByWithRelationInputStrict,
) {}

@InputType()
export class ProductOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder
}
