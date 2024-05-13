import { Entity, JoinColumn, PrimaryGeneratedColumn, OneToOne } from 'typeorm'
import { CodeableConcept } from '../shared/codeableconcept/codeableconcept.entity'

@Entity()
export class Condition {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne((type) => CodeableConcept, { cascade: ['insert', 'update'] })
  @JoinColumn()
  code: CodeableConcept
}
