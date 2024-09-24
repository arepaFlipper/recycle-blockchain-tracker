import { PartialType } from '@nestjs/swagger'
import { CreateToxicItem } from './create.dto'
import { ToxicItem } from '@prisma/client'

export class UpdateToxicItem extends PartialType(CreateToxicItem) {
  id: ToxicItem['id']
}

