import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Extension {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  url: string

  @Column()
  value: string
}
