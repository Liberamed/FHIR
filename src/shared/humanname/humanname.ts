import { Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import { Period } from '../period/period.entity'

export enum NameUse {
  USUAL = 'usual',
  OFFICIAL = 'official',
  TEMP = 'temp',
  NICKNAME = 'nickname',
  ANANYMOUS = 'anonymous',
  OLD = 'old',
  MAIDEN = 'maiden'
}

export class HumanName {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'enum',
    enum: NameUse,
    default: NameUse.OFFICIAL
  })
  use: NameUse

  @Column({
    nullable: true
  })
  text: string

  @Column({
    nullable: true
  })
  family: string

  @Column({
    nullable: true,
    array: true,
    type: 'text'
  })
  given: string[]

  @Column({
    nullable: true
  })
  prefix: string

  @Column({
    nullable: true
  })
  suffix: string

  @OneToOne((type) => Period, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update']
  })
  @JoinColumn()
  period: Period
}
