import { Transaction } from '@prisma/client'
import { IsDate, IsString, IsInt } from 'class-validator'
import { RestrictProperties } from 'src/common/dtos/common.input'

export class TransactionEntity implements RestrictProperties<TransactionEntity, Transaction> {

}

