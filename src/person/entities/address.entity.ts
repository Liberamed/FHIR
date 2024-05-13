import { Entity, ManyToOne } from 'typeorm'
import { Person } from './person.entity'
import { Address } from '../../shared/address/address'

@Entity()
export class PersonAddress extends Address {
  @ManyToOne(
    (type) => Person,
    (person) => person.address,
    { onDelete: 'CASCADE' })
  person: Person
}
