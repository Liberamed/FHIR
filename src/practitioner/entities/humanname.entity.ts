import { Entity, ManyToOne } from 'typeorm'
import { Practitioner } from './practitioner.entity'
import { HumanName } from '../../shared/humanname/humanname'

@Entity()
export class PractitionerName extends HumanName {
  @ManyToOne((type) => Practitioner, (practitioner) => practitioner.name)
  practitioner: Practitioner
}
