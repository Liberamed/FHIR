import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm'
import { FHIRDateColumn } from '../../decorators/fhir-date.decorator'

@Entity()
export class DateTime {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  offsetFromUTC: number

  @FHIRDateColumn({ nullable: true })
  valueAtUTC: Date
}
