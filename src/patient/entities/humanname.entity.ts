import { Entity, ManyToOne } from 'typeorm'
import { Patient } from './patient.entity'
import { HumanName } from '../../shared/humanname/humanname'

@Entity()
export class PatientName extends HumanName {
  @ManyToOne(
    (type) => Patient,
    (patient) => patient.name,
    { onDelete: 'CASCADE' })
  patient: Patient
}
