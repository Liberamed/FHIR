import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Element } from '../element/element'

@Entity()
export class Meta extends Element {

  @PrimaryGeneratedColumn()
  versionId: number

  @Column({ type: 'timestamptz', nullable: true })
  lastUpdated: Date
  
}

