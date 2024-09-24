import { OmitType } from '@nestjs/swagger'
import { ToxicItemEntity } from '../entity/toxic-item.entity'

export class CreateToxicItem extends OmitType(ToxicItemEntity, [
  'createdAt',
  'updatedAt',
  'id',
]) {}
