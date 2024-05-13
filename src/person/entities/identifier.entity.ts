import { Entity, ManyToOne } from 'typeorm'
import { Person } from './person.entity'
import { Identifier } from '../../shared/identifier/identifier.entity'

@Entity()
export class PersonIdentifier extends Identifier {
  @ManyToOne(
    (type) => Person,
    (person) => person.identifier,
    { onDelete: 'CASCADE' })
  person: Person
}
