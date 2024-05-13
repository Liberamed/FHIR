import { Entity, ManyToOne } from 'typeorm'
import { Identifier } from '../../shared/identifier/identifier.entity'
import { Practitioner } from './practitioner.entity'

@Entity()
export class PractitionerIdentifier extends Identifier {
  @ManyToOne((type) => Practitioner, (practitioner) => practitioner.identifier)
  practitioner: Practitioner
}
