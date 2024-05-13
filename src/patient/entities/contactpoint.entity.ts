import { Entity, ManyToOne } from 'typeorm'
import { ContactPoint } from '../../shared/contactpoint/contactpoint'
import { Patient } from './patient.entity'

@Entity()
export class PatientContactPoint extends ContactPoint {
  @ManyToOne(
    (type) => Patient,
    (patient) => patient.telecom,
    { onDelete: 'CASCADE' })
  patient: Patient
}
