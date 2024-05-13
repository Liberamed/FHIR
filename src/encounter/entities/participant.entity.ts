import { Entity, ManyToOne } from 'typeorm'
import { Encounter } from './encounter.entity'
import { Participant } from '../../shared/participant/participant'

@Entity()
export class EncounterParticipant extends Participant {
  @ManyToOne(() => Encounter, (encounter) => encounter.participant, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  encounter: Encounter
}
