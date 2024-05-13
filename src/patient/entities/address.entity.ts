import { Entity, ManyToOne } from 'typeorm'
import { Patient } from './patient.entity'
import { Address } from '../../shared/address/address'

@Entity()
export class PatientAddress extends Address {
  @ManyToOne(
    (type) => Patient,
    (patient) => patient.address,
    { onDelete: 'CASCADE' })
  patient: Patient
}
