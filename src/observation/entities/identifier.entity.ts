import { Entity, ManyToOne } from 'typeorm'
import { Observation } from './observation.entity'
import { Identifier } from '../../shared/identifier/identifier.entity'

@Entity()
export class ObservationIdentifier extends Identifier {
  @ManyToOne((type) => Observation, (observation) => observation.identifier)
  observation: Observation
}
