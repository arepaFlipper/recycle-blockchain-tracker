import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class ManufacturerOrderByWithRelationInputStrict
  implements RestrictProperties<ManufacturerOrderByWithRelationInputStrict, Prisma.ManufacturerOrderByWithRelationInput>
{
  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}


@InputType()
export class ManufacturerOrderByWithRelationInput extends PartialType(
  ManufacturerOrderByWithRelationInputStrict,
) {}

@InputType()
export class ManufacturerOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder
}
