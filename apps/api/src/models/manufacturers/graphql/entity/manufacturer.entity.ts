import { ObjectType } from '@nestjs/graphql'
import { Manufacturer as ManufacturerType } from '@prisma/client'
import { Omit } from '@prisma/client/runtime/library';
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Manufacturer implements RestrictProperties<Manufacturer, Omit<ManufacturerType, 'name' | 'id'>> {
  timestamp: Date;
  location: string;
  contact: string;
  // Todo Add below to make optional fields optional.
  // @Field({ nullable: true })
}

type U = {
  name: string;
  age: number;
};

export class T implements RestrictProperties<T, U> {
  name: string;
  age: number;
}
