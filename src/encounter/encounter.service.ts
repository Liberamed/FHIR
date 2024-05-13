import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { getConnection, Repository } from 'typeorm'
import { Encounter } from './entities/encounter.entity'
import { Period } from '../shared/period/period.entity'
import { CreateEncounterDto } from './dto/create-encounter.dto'
import { UpdateEncounterDto } from './dto/update-encounter.dto'

@Injectable()
export class EncounterService {
  constructor(
    @InjectRepository(Encounter)
    private encounterRepository: Repository<Encounter>
  ) {}

  async create(encounter: CreateEncounterDto) {
    return await this.encounterRepository.save(encounter)
  }

  async findAll(): Promise<Encounter[]> {
    //console.log('The service names are ' + JSON.stringify(params))
    return await this.encounterRepository.find()
  }

  async findOne(_id: number): Promise<Encounter> {
    return await this.encounterRepository
      .createQueryBuilder('encounter')
      .where('encounter.id = :id', { id: _id })
      .getOne()
  }

  async update(id: number, updateEncounterDto: UpdateEncounterDto) {
    return await this.encounterRepository.update(id, updateEncounterDto)
  }

  async remove(_id: number) {
    return await this.encounterRepository.delete(_id)
  }

  async deleteEncounter(_id: number) {
    // More to be done here to fully unlink
    await getConnection()
      .createQueryBuilder()
      .relation(Encounter, 'patient')
      .of(_id)
      .set(null)
    return await this.encounterRepository.delete(_id)
  }

  async removeManyEncounters(ids: string[]) {
    const encounters = await this.encounterRepository.findByIds(ids)
    if (!encounters) {
      throw new NotFoundException(
        `Some encounters not found, no changes applied!`
      )
    }
    return this.encounterRepository.remove(encounters)
  }

  async deleteEncountersPeriod(period: Period) {
    const encs = await this.encounterRepository
      .createQueryBuilder('encounter')
      .leftJoinAndSelect('encounter.period', 'encperiod')
      .where('encperiod.start >= :start', { start: period.start })
      .andWhere('encperiod.end <= :end', { end: period.end })
      .getMany()

    const eids = []

    for (const enc of encs) {
      eids.push(enc.id)
    }

    return this.removeManyEncounters(eids)
  }
}
