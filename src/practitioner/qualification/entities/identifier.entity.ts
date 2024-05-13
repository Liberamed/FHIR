import { Entity, ManyToOne } from 'typeorm'
import { Qualification } from './qualification.entity'
import { Identifier } from '../../../shared/identifier/identifier.entity'

@Entity()
export class QualificationIdentifier extends Identifier {
  @ManyToOne(
    (type) => Qualification,
    (qualification) => qualification.identifier
  )
  qualification: Qualification
}
