import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class ManufacturerWhereUniqueInput {
  id: number
}

@InputType()
export class ManufacturerWhereInputStrict implements RestrictProperties<ManufacturerWhereInputStrict, Prisma.ManufacturerWhereInput> {
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: ManufacturerWhereInput[]
  OR: ManufacturerWhereInput[]
  NOT: ManufacturerWhereInput[]
}

@InputType()
export class ManufacturerWhereInput extends PartialType(
  ManufacturerWhereInputStrict,
) {}

@InputType()
export class ManufacturerListRelationFilter {
  every?: ManufacturerWhereInput
  some?: ManufacturerWhereInput
  none?: ManufacturerWhereInput
}

@InputType()
export class ManufacturerRelationFilter {
  is?: ManufacturerWhereInput
  isNot?: ManufacturerWhereInput
}
