import { PrimaryGeneratedColumn, Entity } from 'typeorm'
import { FHIRDateColumn } from '../decorators/fhir-date.decorator'

@Entity()
export class Period {
  @PrimaryGeneratedColumn()
  id: number

  @FHIRDateColumn({ nullable: true })
  start: Date

  @FHIRDateColumn({ nullable: true })
  end: Date
}
