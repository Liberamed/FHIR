import { Entity, Column, OneToMany } from 'typeorm'
import { DomainResource } from '../../shared/domainresource/domainresource'
import { PatientName } from './humanname.entity'
import { PatientContactPoint } from './contactpoint.entity'
import { PatientAddress } from './address.entity'
import { PatientIdentifier } from './identifier.entity'
import { PatientCommunication } from './communication.entity'
import { Encounter } from '../../encounter/entities/encounter.entity'
import { Observation } from '../../observation/entities/observation.entity'

export enum AdministrativeGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
  UNKNOWN = 'unknown'
}

@Entity()
export class Patient extends DomainResource {
  @OneToMany((type) => PatientIdentifier, (idfr) => idfr.patient, {
    eager: true,
    cascade: ['insert', 'update', 'remove']
  })
  identifier: PatientIdentifier[]

  @OneToMany((type) => PatientName, (name) => name.patient, {
    eager:true,
    cascade: ['insert', 'update', 'remove']
  })
  name: PatientName[]

  @Column({
    nullable: false,
    type: 'enum',
    enum: AdministrativeGender,
    default: AdministrativeGender.UNKNOWN
  })
  gender: AdministrativeGender

  @Column({
    type: 'date',
    default: '1900-01-01'
  })
  birthDate: Date

  @OneToMany((type) => PatientContactPoint, (q) => q.patient, {
    cascade: ['insert', 'update', 'remove']
  })
  telecom: PatientContactPoint[]

  @OneToMany((type) => PatientAddress, (address) => address.patient, {
    cascade: ['insert', 'update', 'remove']
  })
  address: PatientAddress[]

  @OneToMany(
    (type) => PatientCommunication,
    (communication) => communication.patient,
    { cascade: ['insert', 'update', 'remove']}
  )
  communication: PatientCommunication[]

  @OneToMany((type) => Observation, (observation) => observation.patient, {
    cascade: ['insert', 'update', 'remove']
  })
  observation: Observation[]

  @OneToMany((type) => Encounter, (encounter) => encounter.patient, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update', 'remove']
  })
  encounter: Encounter[]
}

export class PatientRepositoryFake {
  public async createPatient(): Promise<void> {}
  public async deletePatient(): Promise<void> {}
}
