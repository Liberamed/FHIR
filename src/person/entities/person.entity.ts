import { Entity, Column, OneToMany } from 'typeorm'
import { DomainResource } from '../../shared/domainresource/domainresource'
import { PersonName } from './humanname.entity'
import { PersonContactPoint } from './contactpoint.entity'
import { PersonAddress } from './address.entity'
import { PersonIdentifier } from './identifier.entity'
import { PersonCommunication } from './communication.entity'

export enum AdministrativeGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
  UNKNOWN = 'unknown'
}

@Entity()
export class Person extends DomainResource {
  @OneToMany((type) => PersonIdentifier, (idfr) => idfr.person, {
    eager: true,
    cascade: ['insert', 'update', 'remove']
  })
  identifier: PersonIdentifier[]

  @OneToMany((type) => PersonName, (name) => name.person, {
    eager:true,
    cascade: ['insert', 'update', 'remove']
  })
  name: PersonName[]

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

  @OneToMany((type) => PersonContactPoint, (q) => q.person, {
    cascade: ['insert', 'update', 'remove']
  })
  telecom: PersonContactPoint[]

  @OneToMany((type) => PersonAddress, (address) => address.person, {
    cascade: ['insert', 'update', 'remove']
  })
  address: PersonAddress[]

  @OneToMany(
    (type) => PersonCommunication,
    (communication) => communication.person,
    { cascade: ['insert', 'update', 'remove']}
  )
  communication: PersonCommunication[]
}