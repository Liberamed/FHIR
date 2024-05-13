import { Entity, ManyToOne } from 'typeorm'
import { Practitioner } from './practitioner.entity'
import { Language } from '../../shared/language/language'

@Entity()
export class PractitionerCommunication extends Language {
  @ManyToOne((type) => Practitioner, (pt) => pt.communication)
  practitioner: Practitioner
}
