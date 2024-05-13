import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

export enum Comparator {
  LT = '<',
  LTE = '<=',
  GTE = '>=',
  GT = '>',
  NONE = ''
}

@Entity()
export class Quantity {
  @PrimaryGeneratedColumn()
  id: string

  @Column({
    type: 'float',
    nullable: true
  })
  value: number

  @Column({
    type: 'enum',
    enum: Comparator,
    default: Comparator.NONE
  })
  comparator: Comparator

  @Column({
    nullable: true
  })
  unit: string

  @Column({
    nullable: true
  })
  system: string

  @Column({
    nullable: true
  })
  code: string
}
