import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { CodeableConcept } from '../codeableconcept.entity'

@Entity()
export class Coding {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne((type) => CodeableConcept, (parent) => parent.coding)
  parent: CodeableConcept

  @Column({
    nullable: true
  })
  system: string

  @Column({
    nullable: true
  })
  version: string

  @Column({
    nullable: true
  })
  code: string

  @Column({
    nullable: true
  })
  display: string

  @Column({
    nullable: true
  })
  primary: boolean

  @Column({
    nullable: true
  })
  valueSet: string
}
