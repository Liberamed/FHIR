import { Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import { Period } from '../period/period.entity'

export enum ContactPointUse {
  HOME = 'home',
  WORK = 'work',
  TEMP = 'temp',
  OLD = 'old',
  MOBILE = 'mobile'
}

export class ContactPoint {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    nullable: true
  })
  system: string

  @Column({
    nullable: true
  })
  value: string

  @Column({
    type: 'enum',
    enum: ContactPointUse,
    default: ContactPointUse.WORK
  })
  use: ContactPointUse

  @Column({
    nullable: true
  })
  rank: number

  @OneToOne((type) => Period, { cascade: ['insert', 'update'] })
  @JoinColumn()
  period: Period
}
