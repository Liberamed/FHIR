import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Person } from './entities/person.entity'
//import { Encounter } from '../encounter/encounter.entity'
import { CreatePersonDto } from './dto/create-person.dto'
import { UpdatePersonDto } from './dto/update-person.dto'
import { UserDto } from '../authz/user/dto/user.dto'

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person) private personRepository: Repository<Person>
  ) {}

  async create(person: CreatePersonDto) {
    return await this.personRepository.save(person)
  }

  async findAll(): Promise<Person[]> {
    //console.log('The service names are ' + JSON.stringify(params))
    return await this.personRepository.find()
  }
  
  async findMy(person: UserDto): Promise<Person> {
    //console.log('The service names are ' + JSON.stringify(params))
    let id : string[] = []
    
    if (person.sub) {
      console.log(person.sub)
      id = person.sub.split('|',2)
    }
    
    console.log(id)
  
    return await this.personRepository
      .createQueryBuilder('person')
      .leftJoinAndSelect('person.identifier', 'identifier')
      .where('identifier.system = :sys', { sys: id[0] })
      .andWhere('identifier.value = :val', { val: id[1] })
      .getOne()
  }

  async findOne(_id: number): Promise<Person> {
    return await this.personRepository
      .createQueryBuilder('person')
      .where('person.id = :id', { id: _id })
      .getOne()
  }

  async findOneWithIdentifiers(_id: number): Promise<Person> {
    return await this.personRepository
      .createQueryBuilder('person')
      .leftJoinAndSelect('person.identifier', 'identifier')
      .where('person.id = :id', { id: _id })
      .getOne()
  }

  async findOneWithNames(_id: number): Promise<Person> {
    return await this.personRepository
      .createQueryBuilder('person')
      .leftJoinAndSelect('person.name', 'name')
      .where('person.id = :id', { id: _id })
      .getOne()
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    console.log('The DTO is ' + JSON.stringify(updatePersonDto))
    return await this.personRepository.update(id, updatePersonDto)
  }

  async remove(_id: number) {
    return await this.personRepository.delete(_id)
  }
}
