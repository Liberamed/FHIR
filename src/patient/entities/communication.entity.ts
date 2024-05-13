import { Entity, Column, ManyToOne } from 'typeorm'
import { Patient } from './patient.entity'
import { Language } from '../../shared/language/language'

@Entity()
export class PatientCommunication extends Language {
  @Column({
    nullable: true
  })
  preferred: boolean

  @ManyToOne(
    (type) => Patient,
    (pt) => pt.communication,
    { onDelete: 'CASCADE' })
  patient: Patient
}
