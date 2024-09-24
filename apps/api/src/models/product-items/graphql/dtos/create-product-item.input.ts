import { InputType, PickType } from '@nestjs/graphql'
import { ProductItem } from '../entity/product-item.entity'

@InputType()
export class CreateProductItemInput extends PickType(ProductItem,[],InputType) {}

