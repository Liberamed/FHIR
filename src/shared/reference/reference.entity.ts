import { Entity, Column, OneToOne } from 'typeorm'
import { Element } from '../element/element'
import { Identifier } from '../identifier/identifier.entity'

@Entity()
export class Reference extends Element {
  @Column()
  reference: string

  @Column({ nullable: true })
  type: string

  @OneToOne((type) => Identifier, {
    nullable: true,
    cascade: ['insert', 'update', 'remove']
  })
  identifier: Identifier

  @Column({ nullable: true })
  display: string
}
