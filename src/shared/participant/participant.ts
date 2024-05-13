import {
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { CodeableConcept } from '../../shared/codeableconcept/codeableconcept.entity'
import { Period } from '../../shared/period/period.entity'
import { Reference } from '../../shared/reference/reference.entity'

export class Participant {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(() => Period, {
    onDelete: 'CASCADE',
    cascade: true
  })
  @JoinColumn()
  period: Period

  @ManyToMany((type) => CodeableConcept, {
    nullable: true,
    cascade: ['insert', 'update', 'remove']
  })
  @JoinTable()
  type: CodeableConcept[]

  @OneToOne((type) => Reference, {
    cascade: ['insert', 'update', 'remove']
  })
  @JoinColumn()
  actor: Reference
}
