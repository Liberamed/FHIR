import { Entity, ManyToOne } from 'typeorm'
import { Appointment } from './appointment.entity'
import { Participant } from '../../shared/participant/participant'

@Entity()
export class AppointmentParticipant extends Participant {
  @ManyToOne(() => Appointment, (appointment) => appointment.participant, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  appointment: Appointment
}
