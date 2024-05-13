import { PartialType } from '@nestjs/mapped-types'
import { Person } from '../entities/person.entity'

export class UpdatePersonDto extends PartialType(Person) {}
