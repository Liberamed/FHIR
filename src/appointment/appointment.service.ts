import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { UpdateAppointmentDto } from './dto/update-appointment.dto'
import { Appointment } from './entities/appointment.entity'

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>
  ) {}

  async create(appointment: CreateAppointmentDto) {
    return await this.appointmentRepository.save(appointment)
  }

  async findAll(): Promise<Appointment[]> {
    return await this.appointmentRepository.find()
    //return `This action returns all appointment`
  }

  async findOne(_id: number): Promise<Appointment> {
    return await this.appointmentRepository
      .createQueryBuilder('appointment')
      .where('appointment.id = :id', { id: _id })
      .getOne()
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return await this.appointmentRepository.update(id, updateAppointmentDto)
  }

  async remove(id: number) {
    return await this.appointmentRepository.delete(id)
  }
}
