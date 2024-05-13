import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Practitioner } from './entities/practitioner.entity'
import { CreatePractitionerDto } from './dto/create-practitioner.dto'
import { UpdatePractitionerDto } from './dto/update-practitioner.dto'

@Injectable()
export class PractitionerService {
  constructor(
    @InjectRepository(Practitioner)
    private practitionerRepository: Repository<Practitioner>
  ) {}

  async create(practitioner: CreatePractitionerDto) {
    return await this.practitionerRepository.save(practitioner)
  }

  async findAll(): Promise<Practitioner[]> {
    //console.log('The service names are ' + JSON.stringify(params))
    return await this.practitionerRepository.find()
  }

  async findOne(_id: number): Promise<Practitioner> {
    return await this.practitionerRepository
      .createQueryBuilder('practitioner')
      .where('practitioner.id = :id', { id: _id })
      .getOne()
  }

  async update(id: number, updatePractitionerDto: UpdatePractitionerDto) {
    return await this.practitionerRepository.update(id, updatePractitionerDto)
  }

  async remove(_id: number) {
    return await this.practitionerRepository.delete(_id)
  }

  async getByNPI(npi: number): Promise<Practitioner> {
    return await this.practitionerRepository
      .createQueryBuilder('practitioner')
      .leftJoinAndSelect('practitioner.identifier', 'identifier')
      .where('identifier.assigner LIKE :assigner', { assigner: 'NPPES' })
      .andWhere('identifier.value = :val', { val: npi })
      .getOne()
  }
}
