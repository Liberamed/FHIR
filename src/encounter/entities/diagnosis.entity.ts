import {
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne
} from 'typeorm'
import { Encounter } from './encounter.entity'
import { CodeableConcept } from '../../shared/codeableconcept/codeableconcept.entity'
import { Reference } from '../../shared/reference/reference.entity'

@Entity()
export class Diagnosis {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne((type) => Encounter, (encounter) => encounter.diagnosis, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE'
  })
  encounter: Encounter

  @OneToOne((type) => CodeableConcept, { cascade: ['insert', 'update'] })
  @JoinColumn()
  use: CodeableConcept

  @OneToOne(() => Reference, {
    cascade: ['insert', 'update', 'remove']
  })
  condition: Reference
}
