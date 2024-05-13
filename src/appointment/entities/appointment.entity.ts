import {
  Entity,
  Column,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne
} from 'typeorm'
import { AppointmentIdentifier } from './identifier.entity'
import { AppointmentParticipant } from './participant.entity'
import { CodeableConcept } from '../../shared/codeableconcept/codeableconcept.entity'
import { DomainResource } from '../../shared/domainresource/domainresource'
import { CodeableReference } from '../../shared/codeable.reference/codeable.reference.entity'
import { Annotation } from '../../shared/annotation/annotation.entity'
import { Reference } from '../../shared/reference/reference.entity'
import { FHIRDateColumn } from '../../shared/decorators/fhir-date.decorator'
import { Period } from '../../shared/period/period.entity'

export enum AppointmentStatus {
  PROPOSED = 'proposed',
  PENDING = 'pending',
  BOOKED = 'booked',
  ARRIVED = 'arrived',
  FULFILLED = 'fulfilled',
  CANCLELED = 'cancelled',
  NOSHOW = 'noshow',
  ENTEREDINERROR = 'entered-in-error',
  CHECKEDIN = 'checked-in',
  WAITLIST = 'waitlist'
}

@Entity()
export class Appointment extends DomainResource {
  @OneToMany((type) => AppointmentIdentifier, (idfr) => idfr.appointment, {
    cascade: ['insert', 'update', 'remove']
  })
  identifier: AppointmentIdentifier[]

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.PROPOSED
  })
  status: AppointmentStatus

  @OneToOne(() => CodeableConcept, {
    nullable: true,
    cascade: ['insert', 'update', 'remove']
  })
  cancellationReason: CodeableConcept[]

  @ManyToMany(() => CodeableConcept, {
    nullable: true,
    cascade: ['insert', 'update', 'remove']
  })
  @JoinTable()
  serviceCategory: CodeableConcept[]

  @ManyToMany(() => CodeableConcept, {
    nullable: true,
    cascade: ['insert', 'update', 'remove']
  })
  @JoinTable()
  serviceType: CodeableConcept[]

  @ManyToMany(() => CodeableConcept, {
    nullable: true,
    cascade: ['insert', 'update', 'remove']
  })
  @JoinTable()
  specialty: CodeableConcept[]

  @OneToOne(() => CodeableConcept, {
    nullable: true,
    cascade: ['insert', 'update', 'remove']
  })
  appointmentType: CodeableConcept

  @ManyToMany(() => CodeableReference, {
    nullable: true,
    cascade: ['insert', 'update', 'remove']
  })
  @JoinTable()
  reason: CodeableReference[]

  @OneToOne(() => CodeableConcept, {
    nullable: true,
    cascade: ['insert', 'update', 'remove']
  })
  priority: CodeableConcept

  @Column({
    nullable: true
  })
  description?: string

  @ManyToMany(() => Reference, {
    nullable: true,
    cascade: ['insert', 'update', 'remove']
  })
  @JoinTable()
  replaces: Reference[]

  @ManyToMany(() => Reference, {
    nullable: true,
    cascade: ['insert', 'update', 'remove']
  })
  @JoinTable()
  supportingInformation: Reference[]

  @FHIRDateColumn({ nullable: true })
  start: Date

  @FHIRDateColumn({ nullable: true })
  end: Date

  @Column({
    type: 'integer'
  })
  minutesDuration: number

  @ManyToMany(() => Reference, {
    nullable: true,
    cascade: ['insert', 'update', 'remove']
  })
  @JoinTable()
  slot: Reference[]

  @ManyToMany(() => Reference, {
    nullable: true,
    cascade: ['insert', 'update', 'remove']
  })
  @JoinTable()
  account: Reference[]

  @FHIRDateColumn({ nullable: true })
  created: Date

  @ManyToMany(() => Annotation, {
    nullable: true,
    cascade: ['insert', 'update', 'remove']
  })
  @JoinTable()
  note: Annotation[]

  @ManyToMany(() => CodeableReference, {
    nullable: true,
    cascade: ['insert', 'update', 'remove']
  })
  @JoinTable()
  patientInstruction: CodeableReference[]

  @ManyToMany(() => Reference, {
    nullable: true,
    cascade: ['insert', 'update', 'remove']
  })
  @JoinTable()
  basedOn: Reference[]

  @OneToOne(() => Reference, {
    nullable: true,
    cascade: ['insert', 'update', 'remove']
  })
  subject: Reference

  @OneToMany(
    () => AppointmentParticipant,
    (participant) => participant.appointment,
    {
      onDelete: 'CASCADE',
      cascade: ['insert', 'update', 'remove']
    }
  )
  participant: AppointmentParticipant[]

  @ManyToMany((type) => Period, {
    onDelete: 'CASCADE',
    cascade: true
  })
  @JoinTable()
  requestedPeriod: Period[]
}
