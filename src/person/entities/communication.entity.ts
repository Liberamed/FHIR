import { Entity, Column, ManyToOne } from 'typeorm'
import { Person } from './person.entity'
import { Language } from '../../shared/language/language'

@Entity()
export class PersonCommunication extends Language {
  @Column({
    nullable: true
  })
  preferred: boolean

  @ManyToOne(
    (type) => Person,
    (pt) => pt.communication,
    { onDelete: 'CASCADE' })
  person: Person
}
