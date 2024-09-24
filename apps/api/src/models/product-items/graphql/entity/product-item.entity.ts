import { ObjectType } from '@nestjs/graphql'
import { ProductItem as ProductItemType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class ProductItem implements RestrictProperties<ProductItem,ProductItemType> {
    // Todo Add below to make optional fields optional.
    // @Field({ nullable: true })
}
