import { Appointment } from './entities/appointment.entity'
import { AppointmentIdentifier } from './entities/identifier.entity'
import { AppointmentParticipant } from './entities/participant.entity'
import { AppointmentService } from './appointment.service'
import { AppointmentController } from './appointment.controller'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    TypeOrmModule.forFeature([AppointmentIdentifier]),
    TypeOrmModule.forFeature([AppointmentParticipant])
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService]
})
export class AppointmentModule {}
