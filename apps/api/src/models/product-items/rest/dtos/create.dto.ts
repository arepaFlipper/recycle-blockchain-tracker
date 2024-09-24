import { OmitType } from '@nestjs/swagger'
import { ProductItemEntity } from '../entity/product-item.entity'

export class CreateProductItem extends OmitType(ProductItemEntity, [
  'createdAt',
  'updatedAt',
  'id',
]) {}
