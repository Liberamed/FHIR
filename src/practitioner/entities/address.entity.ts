import { Entity, ManyToOne } from 'typeorm'
import { Practitioner } from './practitioner.entity'
import { Address } from '../../shared/address/address'

@Entity()
export class PractitionerAddress extends Address {
  @ManyToOne((type) => Practitioner, (practitioner) => practitioner.address)
  practitioner: Practitioner
}
