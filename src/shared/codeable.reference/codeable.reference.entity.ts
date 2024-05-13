import { Entity, OneToOne } from 'typeorm'
import { CodeableConcept } from '../codeableconcept/codeableconcept.entity'
import { Element } from '../element/element'
import { Reference } from '../reference/reference.entity'

@Entity()
export class CodeableReference extends Element {
  @OneToOne((type) => CodeableConcept, {
    nullable: true,
    cascade: ['insert', 'update', 'remove']
  })
  concept: CodeableConcept

  @OneToOne((type) => Reference, {
    nullable: true,
    cascade: ['insert', 'update', 'remove']
  })
  reference: Reference
}
