import { ToxicItem } from '@prisma/client'
import { IsDate, IsString, IsInt } from 'class-validator'
import { RestrictProperties } from 'src/common/dtos/common.input'

export class ToxicItemEntity implements RestrictProperties<ToxicItemEntity, ToxicItem> {

}

