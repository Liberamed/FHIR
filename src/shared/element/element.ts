import { JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Extension } from '../extension/extension.entity'

export class Element {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToMany(() => Extension, {
    nullable: true,
    cascade: ['insert', 'update', 'remove']
  })
  @JoinTable()
  extension: Extension[]
}
