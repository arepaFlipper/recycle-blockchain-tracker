import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class ProductItemOrderByWithRelationInputStrict
  implements RestrictProperties<ProductItemOrderByWithRelationInputStrict, Prisma.ProductItemOrderByWithRelationInput>
{
  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}


@InputType()
export class ProductItemOrderByWithRelationInput extends PartialType(
  ProductItemOrderByWithRelationInputStrict,
) {}

@InputType()
export class ProductItemOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder
}
