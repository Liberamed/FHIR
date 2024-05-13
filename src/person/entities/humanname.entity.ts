import { Entity, ManyToOne } from 'typeorm'
import { Person } from './person.entity'
import { HumanName } from '../../shared/humanname/humanname'

@Entity()
export class PersonName extends HumanName {
  @ManyToOne(
    (type) => Person,
    (person) => person.name,
    { onDelete: 'CASCADE' })
  person: Person
}
