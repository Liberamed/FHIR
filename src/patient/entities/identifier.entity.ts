import { Entity, ManyToOne } from 'typeorm'
import { Patient } from './patient.entity'
import { Identifier } from '../../shared/identifier/identifier.entity'

@Entity()
export class PatientIdentifier extends Identifier {
  @ManyToOne(
    (type) => Patient,
    (patient) => patient.identifier,
    { onDelete: 'CASCADE' })
  patient: Patient
}
