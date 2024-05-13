import { Entity, ManyToOne } from 'typeorm'
import { ContactPoint } from '../../shared/contactpoint/contactpoint'
import { Practitioner } from './practitioner.entity'

@Entity()
export class PractitionerContactPoint extends ContactPoint {
  @ManyToOne((type) => Practitioner, (practitioner) => practitioner.telecom)
  practitioner: Practitioner
}
