import { PartialType } from '@nestjs/mapped-types'
import { Person } from '../entities/person.entity'
import { AdministrativeGender } from '../entities/person.entity'

export class CreatePersonDto extends PartialType(Person) {}
