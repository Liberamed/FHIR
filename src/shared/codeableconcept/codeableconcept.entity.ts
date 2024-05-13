import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
//import { Observation } from '../observation/observation.entity'
import { Coding } from './coding/coding.entity'

@Entity()
export class CodeableConcept {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    nullable: true
  })
  text: string

  @OneToMany((type) => Coding, (coding) => coding.parent, {
    cascade: ['insert', 'update']
  })
  coding: Coding[]
}
