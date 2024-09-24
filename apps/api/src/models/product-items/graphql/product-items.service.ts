import { Injectable } from '@nestjs/common'
import { FindManyProductItemArgs, FindUniqueProductItemArgs } from './dtos/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateProductItemInput } from './dtos/create-product-item.input'
import { UpdateProductItemInput } from './dtos/update-product-item.input'

@Injectable()
export class ProductItemsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createProductItemInput: CreateProductItemInput) {
    return this.prisma.productItem.create({
      data: createProductItemInput,
    })
  }

  findAll(args: FindManyProductItemArgs) {
    return this.prisma.productItem.findMany(args)
  }

  findOne(args: FindUniqueProductItemArgs) {
    return this.prisma.productItem.findUnique(args)
  }

  update(updateProductItemInput: UpdateProductItemInput) {
    const { id, ...data } = updateProductItemInput
    return this.prisma.productItem.update({
      where: { id },
      data: data,
    })
  }

  remove(args: FindUniqueProductItemArgs) {
    return this.prisma.productItem.delete(args)
  }
}
