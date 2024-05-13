import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Patient } from './entities/patient.entity'
//import { Encounter } from '../encounter/encounter.entity'
import { CreatePatientDto } from './dto/create-patient.dto'
import { UpdatePatientDto } from './dto/update-patient.dto'
import { UserDto } from '../authz/user/dto/user.dto'

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient) private patientRepository: Repository<Patient>
  ) {}

  async create(patient: CreatePatientDto) {
    return await this.patientRepository.save(patient)
  }

  async findAll(): Promise<Patient[]> {
    //console.log('The service names are ' + JSON.stringify(params))
    return await this.patientRepository.find()
  }
  
  async findMy(patient: UserDto): Promise<Patient> {
    //console.log('The service names are ' + JSON.stringify(params))
    let id : string[] = []
    
    if (patient.sub) {
      console.log(patient.sub)
      id = patient.sub.split('|',2)
    }
    
    console.log(id)
  
    return await this.patientRepository
      .createQueryBuilder('patient')
      .leftJoinAndSelect('patient.identifier', 'identifier')
      .where('identifier.system = :sys', { sys: id[0] })
      .andWhere('identifier.value = :val', { val: id[1] })
      .getOne()
  }

  async findOne(_id: number): Promise<Patient> {
    return await this.patientRepository
      .createQueryBuilder('patient')
      .where('patient.id = :id', { id: _id })
      .getOne()
  }

  async findOneWithIdentifiers(_id: number): Promise<Patient> {
    return await this.patientRepository
      .createQueryBuilder('patient')
      .leftJoinAndSelect('patient.identifier', 'identifier')
      .where('patient.id = :id', { id: _id })
      .getOne()
  }

  async findOneWithNames(_id: number): Promise<Patient> {
    return await this.patientRepository
      .createQueryBuilder('patient')
      .leftJoinAndSelect('patient.name', 'name')
      .where('patient.id = :id', { id: _id })
      .getOne()
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    console.log('The DTO is ' + JSON.stringify(updatePatientDto))
    return await this.patientRepository.update(id, updatePatientDto)
  }

  async remove(_id: number) {
    return await this.patientRepository.delete(_id)
  }
}
