import { Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import { Period } from '../period/period.entity'

export enum AddressUse {
  HOME = 'home',
  WORK = 'work',
  TEMP = 'temp',
  OLD = 'old',
  BILLING = 'billing'
}

export enum AddressType {
  POSTAL = 'postal',
  PHYSICAL = 'physical',
  BOTH = 'both'
}

export class Address {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'enum',
    enum: AddressUse,
    default: AddressUse.HOME
  })
  use: AddressUse

  @Column({
    type: 'enum',
    enum: AddressType,
    default: AddressType.BOTH
  })
  type: AddressType

  @Column({
    nullable: true
  })
  text: string

  @Column({
    nullable: true,
    array: true,
    type: 'text'
  })
  line: string[]

  @Column({
    nullable: true
  })
  city: string

  @Column({
    nullable: true
  })
  district: string

  @Column({
    nullable: true
  })
  state: string

  @Column({
    nullable: true
  })
  postalCode: string

  @Column({
    nullable: true
  })
  country: string

  @OneToOne(
    (type) => Period,
    { cascade: ['insert', 'update', 'remove'] }
  )
  @JoinColumn()
  period: Period
}
