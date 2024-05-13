import { Entity, ManyToOne } from 'typeorm'
import { ContactPoint } from '../../shared/contactpoint/contactpoint'
import { Person } from './person.entity'

@Entity()
export class PersonContactPoint extends ContactPoint {
  @ManyToOne(
    (type) => Person,
    (person) => person.telecom,
    { onDelete: 'CASCADE' })
  person: Person
}
