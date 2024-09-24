import { PartialType } from '@nestjs/swagger'
import { CreateProductItem } from './create.dto'
import { ProductItem } from '@prisma/client'

export class UpdateProductItem extends PartialType(CreateProductItem) {
  id: ProductItem['id']
}

