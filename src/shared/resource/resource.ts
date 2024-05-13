import { JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Meta } from './meta.entity'

export class Resource {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne((type) => Meta, {
    nullable: true,
    cascade: ['insert', 'update', 'remove']
  })
  meta: Meta
}
