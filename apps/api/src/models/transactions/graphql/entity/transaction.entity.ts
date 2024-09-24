import { ObjectType } from '@nestjs/graphql'
import { Transaction as TransactionType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Transaction implements RestrictProperties<Transaction,TransactionType> {
    // Todo Add below to make optional fields optional.
    // @Field({ nullable: true })
}
