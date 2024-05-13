import { Entity, ManyToOne } from 'typeorm'
import { Encounter } from './encounter.entity'
import { Identifier } from '../../shared/identifier/identifier.entity'

@Entity()
export class EncounterIdentifier extends Identifier {
  @ManyToOne((type) => Encounter, (encounter) => encounter.identifier, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE'
  })
  encounter: Encounter
}
