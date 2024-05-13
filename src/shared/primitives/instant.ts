import { PrimaryGeneratedColumn, Column } from 'typeorm'

export class Instant {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  offsetFromUTC: number

  @Column({ type: 'timestamptz', nullable: true })
  valueAtUTC: Date
}
