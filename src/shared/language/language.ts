import { PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import { CodeableConcept } from '../codeableconcept/codeableconcept.entity'

export class Language {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne((type) => CodeableConcept)
  @JoinColumn()
  language: CodeableConcept
}
