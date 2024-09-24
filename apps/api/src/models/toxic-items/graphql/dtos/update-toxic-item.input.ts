import { CreateToxicItemInput } from './create-toxic-item.input'
import { InputType, PartialType } from '@nestjs/graphql'
import { ToxicItem } from '@prisma/client'

@InputType()
export class UpdateToxicItemInput extends PartialType(CreateToxicItemInput) {
  id: ToxicItem['id']
}
