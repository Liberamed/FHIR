import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Period } from '../period/period.entity'
import { CodeableConcept } from '../codeableconcept/codeableconcept.entity'

export enum IdentifierUse {
  USUAL = 'usual',
  OFFICIAL = 'official',
  TEMP = 'temp',
  SECONDARY = 'secondary',
  OLD = 'old'
}

@Entity()
@Index(['system', 'value'], { unique: true })
export class Identifier {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'enum',
    enum: IdentifierUse,
    default: IdentifierUse.OFFICIAL
  })
  use: IdentifierUse

  @OneToOne(
    (type) => CodeableConcept,
    {
      nullable: true,
      cascade: ['insert', 'update', 'remove']
    }
  ) type: CodeableConcept

  @Column({
    nullable: true
  })
  system: string

  @Column({
    nullable: true
  })
  value: string

  @OneToOne(
    (type) => Period,
    {
      nullable: true,
      cascade: ['insert', 'update', 'remove']
    }
  )
  @JoinColumn()
  period: Period

  @Column({
    nullable: true
  })
  assigner: string
}
