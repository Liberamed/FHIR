import { Column, Entity, OneToOne } from 'typeorm'
import { Element } from '../element/element'
import { Reference } from '../reference/reference.entity'
import { FHIRDateColumn } from '../../shared/decorators/fhir-date.decorator'

@Entity()
export class Annotation extends Element {
  @OneToOne((type) => Reference, {
    nullable: true,
    cascade: ['insert', 'update', 'remove']
  })
  authorReference: Reference

  @Column()
  authorString: string

  @FHIRDateColumn({ nullable: true })
  time: Date

  @Column({
    type: 'text'
  })
  text: string
}
