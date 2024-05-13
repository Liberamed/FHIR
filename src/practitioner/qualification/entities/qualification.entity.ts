import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { Practitioner } from '../../entities/practitioner.entity'
import { QualificationIdentifier } from './identifier.entity'
import { CodeableConcept } from '../../../shared/codeableconcept/codeableconcept.entity'
import { Period } from '../../../shared/period/period.entity'

@Entity()
export class Qualification {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(
    (type) => Practitioner,
    (practitioner) => practitioner.qualification
  )
  practitioner: Practitioner

  @OneToMany((type) => QualificationIdentifier, (idfr) => idfr.qualification)
  identifier: QualificationIdentifier[]

  @OneToOne((type) => CodeableConcept, { cascade: true })
  @JoinColumn()
  code: CodeableConcept

  @OneToOne((type) => Period, {
    cascade: true
  })
  @JoinColumn()
  period: Period

  @Column({
    nullable: true
  })
  issuer: string
}
