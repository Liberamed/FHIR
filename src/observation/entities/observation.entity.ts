import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable
} from 'typeorm'
import { CodeableConcept } from '../../shared/codeableconcept/codeableconcept.entity'
import { Patient } from '../../patient/entities/patient.entity'
import { Practitioner } from '../../practitioner/entities/practitioner.entity'
import { Quantity } from './quantity.entity'
import { ObservationIdentifier } from './identifier.entity'
import { Reference } from '../../shared/reference/reference.entity'
//import { Value } from './value/value.entity'

export enum ObservationStatus {
  REGISTERED = 'registered',
  PRELIMINARY = 'preliminary',
  FINAL = 'final',
  AMENDED = 'amended'
}

@Entity()
export class Observation {
  @PrimaryGeneratedColumn()
  id: number

  @OneToMany((type) => ObservationIdentifier, (idfr) => idfr.observation, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update', 'remove']
  })
  identifier: ObservationIdentifier[]

  @Column({
    nullable: true
  })
  valueInteger: number

  @Column({
    nullable: true
  })
  valueString: string

  @OneToOne((type) => Quantity, {
    nullable: true,
    cascade: ['insert', 'update']
  })
  @JoinColumn()
  valueQuantity: Quantity

  @Column({
    type: 'enum',
    enum: ObservationStatus,
    default: ObservationStatus.FINAL
  })
  status: ObservationStatus

  @ManyToMany((type) => CodeableConcept, { cascade: ['insert', 'update'] })
  @JoinTable()
  category: CodeableConcept[]

  @OneToOne((type) => CodeableConcept, { cascade: ['insert', 'update'] })
  @JoinColumn()
  code: CodeableConcept

  @OneToOne(() => Reference, {
    nullable: true,
    cascade: ['insert', 'update', 'remove']
  })
  subject: Reference

  @ManyToOne((type) => Patient, (patient) => patient.observation)
  patient: Patient

  @Column({
    default: '1900-01-01'
  })
  effectiveDateTime: Date

  @ManyToMany((type) => Practitioner)
  @JoinTable()
  performer: Practitioner[]

  @ManyToMany((type) => CodeableConcept)
  interpretation: CodeableConcept[]

  @OneToOne((type) => CodeableConcept)
  @JoinColumn()
  bodySite: CodeableConcept

  @OneToOne((type) => CodeableConcept)
  @JoinColumn()
  method: CodeableConcept

  @ManyToMany((type) => CodeableConcept)
  component: CodeableConcept[]
}
