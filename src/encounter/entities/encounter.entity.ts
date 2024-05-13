import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { CodeableConcept } from '../../shared/codeableconcept/codeableconcept.entity'
import { Diagnosis } from './diagnosis.entity'
import { EncounterIdentifier } from './identifier.entity'
import { EncounterParticipant } from './participant.entity'
import { Patient } from '../../patient/entities/patient.entity'
import { Period } from '../../shared/period/period.entity'
import { Reference } from '../../shared/reference/reference.entity'

@Entity()
export class Encounter {
  @PrimaryGeneratedColumn()
  id: number

  @OneToMany((type) => EncounterIdentifier, (idfr) => idfr.encounter, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update', 'remove']
  })
  identifier: EncounterIdentifier[]

  @OneToOne(() => Reference, {
    nullable: true,
    cascade: ['insert', 'update', 'remove']
  })
  subject: Reference

  @ManyToOne((type) => Patient, (patient) => patient.encounter) patient: Patient

  @ManyToMany(() => CodeableConcept, {
    nullable: true,
    cascade: ['insert', 'update', 'remove']
  })
  @JoinTable()
  type: CodeableConcept[]

  @OneToMany(
    () => EncounterParticipant,
    (participant) => participant.encounter,
    {
      onDelete: 'CASCADE',
      cascade: ['insert', 'update', 'remove']
    }
  )
  participant: EncounterParticipant[]

  @OneToOne((type) => Period, {
    onDelete: 'CASCADE',
    cascade: true
  })
  @JoinColumn()
  period: Period

  @OneToMany((type) => Diagnosis, (dgnss) => dgnss.encounter)
  diagnosis: Diagnosis[]
}
