import { CreateProductItemInput } from './create-product-item.input'
import { InputType, PartialType } from '@nestjs/graphql'
import { ProductItem } from '@prisma/client'

@InputType()
export class UpdateProductItemInput extends PartialType(CreateProductItemInput) {
  id: ProductItem['id']
}
