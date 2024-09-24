import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class ProductWhereUniqueInput {
  id: number
}

@InputType()
export class ProductWhereInputStrict implements RestrictProperties<ProductWhereInputStrict, Prisma.ProductWhereInput> {
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: ProductWhereInput[]
  OR: ProductWhereInput[]
  NOT: ProductWhereInput[]
}

@InputType()
export class ProductWhereInput extends PartialType(
  ProductWhereInputStrict,
) {}

@InputType()
export class ProductListRelationFilter {
  every?: ProductWhereInput
  some?: ProductWhereInput
  none?: ProductWhereInput
}

@InputType()
export class ProductRelationFilter {
  is?: ProductWhereInput
  isNot?: ProductWhereInput
}
