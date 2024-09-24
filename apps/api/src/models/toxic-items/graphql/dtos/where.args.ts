import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class ToxicItemWhereUniqueInput {
  id: number
}

@InputType()
export class ToxicItemWhereInputStrict implements RestrictProperties<ToxicItemWhereInputStrict, Prisma.ToxicItemWhereInput> {
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: ToxicItemWhereInput[]
  OR: ToxicItemWhereInput[]
  NOT: ToxicItemWhereInput[]
}

@InputType()
export class ToxicItemWhereInput extends PartialType(
  ToxicItemWhereInputStrict,
) {}

@InputType()
export class ToxicItemListRelationFilter {
  every?: ToxicItemWhereInput
  some?: ToxicItemWhereInput
  none?: ToxicItemWhereInput
}

@InputType()
export class ToxicItemRelationFilter {
  is?: ToxicItemWhereInput
  isNot?: ToxicItemWhereInput
}
