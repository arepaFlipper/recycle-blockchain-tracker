import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class ProductItemWhereUniqueInput {
  id: number
}

@InputType()
export class ProductItemWhereInputStrict implements RestrictProperties<ProductItemWhereInputStrict, Prisma.ProductItemWhereInput> {
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: ProductItemWhereInput[]
  OR: ProductItemWhereInput[]
  NOT: ProductItemWhereInput[]
}

@InputType()
export class ProductItemWhereInput extends PartialType(
  ProductItemWhereInputStrict,
) {}

@InputType()
export class ProductItemListRelationFilter {
  every?: ProductItemWhereInput
  some?: ProductItemWhereInput
  none?: ProductItemWhereInput
}

@InputType()
export class ProductItemRelationFilter {
  is?: ProductItemWhereInput
  isNot?: ProductItemWhereInput
}
