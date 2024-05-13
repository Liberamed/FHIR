import { Entity, ManyToOne } from 'typeorm'
import { Appointment } from './appointment.entity'
import { Identifier } from '../../shared/identifier/identifier.entity'

@Entity()
export class AppointmentIdentifier extends Identifier {
  @ManyToOne((type) => Appointment, (appointment) => appointment.identifier)
  appointment: Appointment
}
