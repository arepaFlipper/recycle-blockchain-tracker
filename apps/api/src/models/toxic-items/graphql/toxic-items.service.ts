import { Injectable } from '@nestjs/common'
import { FindManyToxicItemArgs, FindUniqueToxicItemArgs } from './dtos/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateToxicItemInput } from './dtos/create-toxic-item.input'
import { UpdateToxicItemInput } from './dtos/update-toxic-item.input'

@Injectable()
export class ToxicItemsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createToxicItemInput: CreateToxicItemInput) {
    return this.prisma.toxicItem.create({
      data: createToxicItemInput,
    })
  }

  findAll(args: FindManyToxicItemArgs) {
    return this.prisma.toxicItem.findMany(args)
  }

  findOne(args: FindUniqueToxicItemArgs) {
    return this.prisma.toxicItem.findUnique(args)
  }

  update(updateToxicItemInput: UpdateToxicItemInput) {
    const { id, ...data } = updateToxicItemInput
    return this.prisma.toxicItem.update({
      where: { id },
      data: data,
    })
  }

  remove(args: FindUniqueToxicItemArgs) {
    return this.prisma.toxicItem.delete(args)
  }
}
