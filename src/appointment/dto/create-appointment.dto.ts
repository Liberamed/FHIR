import { AppointmentStatus } from '../entities/appointment.entity'
import { IsInt } from 'class-validator'

export class CreateAppointmentDto {
  status: AppointmentStatus = AppointmentStatus.PROPOSED

  @IsInt()
  minutesDuration: number

  //@IsOptional()
  //description: string
}
