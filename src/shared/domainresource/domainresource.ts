import { Column, JoinTable, ManyToMany } from 'typeorm'
import { Extension } from '../extension/extension.entity'
import { Resource } from '../resource/resource'

export class DomainResource extends Resource {
  @Column()
  resourceType: string

  @ManyToMany(() => Extension, {
    nullable: true,
    cascade: ['insert', 'update', 'remove']
  })
  @JoinTable()
  extension: Extension[]

  @ManyToMany(() => Extension, {
    nullable: true,
    cascade: ['insert', 'update', 'remove']
  })
  @JoinTable()
  modifierExtension: Extension[]
}
