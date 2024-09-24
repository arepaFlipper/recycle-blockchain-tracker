import { InputType, PickType } from '@nestjs/graphql'
import { ToxicItem } from '../entity/toxic-item.entity'

@InputType()
export class CreateToxicItemInput extends PickType(ToxicItem,[],InputType) {}

