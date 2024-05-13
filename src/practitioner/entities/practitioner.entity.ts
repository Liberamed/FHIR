import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Qualification } from '../qualification/entities/qualification.entity'
import { PractitionerContactPoint } from './contactpoint.entity'
import { PractitionerIdentifier } from './identifier.entity'
import { PractitionerName } from './humanname.entity'
import { PractitionerAddress } from './address.entity'
import { PractitionerCommunication } from './communication.entity'

export enum AdministrativeGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
  UNKNOWN = 'unknown'
}

@Entity()
export class Practitioner {
  @PrimaryGeneratedColumn()
  id: number

  @OneToMany((type) => PractitionerIdentifier, (idfr) => idfr.practitioner, {
    onDelete: 'CASCADE',
    cascade: true
  })
  identifier: PractitionerIdentifier[]

  @Column({ nullable: true })
  active: boolean

  @OneToMany((type) => PractitionerName, (name) => name.practitioner, {
    onDelete: 'CASCADE',
    cascade: true
  })
  name: PractitionerName[]

  @OneToMany((type) => PractitionerContactPoint, (q) => q.practitioner, {
    onDelete: 'CASCADE',
    cascade: true
  })
  telecom: PractitionerContactPoint[]

  @OneToMany((type) => PractitionerAddress, (address) => address.practitioner, {
    onDelete: 'CASCADE',
    cascade: true
  })
  address: PractitionerAddress[]

  @Column({
    type: 'date',
    default: '1900-01-01'
  })
  birthDate: Date

  @Column({
    type: 'enum',
    enum: AdministrativeGender,
    default: AdministrativeGender.UNKNOWN
  })
  gender: AdministrativeGender

  @OneToMany((type) => Qualification, (q) => q.practitioner, {
    onDelete: 'CASCADE',
    cascade: true
  })
  qualification: Qualification[]

  @OneToMany(
    (type) => PractitionerCommunication,
    (communication) => communication.practitioner,
    {
      onDelete: 'CASCADE',
      cascade: true
    }
  )
  communication: PractitionerCommunication[]
}
