import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { getConnection, Repository } from 'typeorm'
import { Observation } from './entities/observation.entity'

@Injectable()
export class ObservationService {
  constructor(
    @InjectRepository(Observation)
    private observationRepository: Repository<Observation>
  ) {}

  async searchAthena(aid: number): Promise<Observation> {
    return await this.observationRepository
      .createQueryBuilder('observation')
      .leftJoinAndSelect('observation.identifier', 'identifier')
      .where('identifier.assigner LIKE :assigner', { assigner: 'Athena' })
      .andWhere('identifier.value = :val', { val: aid })
      .getOne()
  }

  async searchPatientObservations(patientID: number): Promise<Observation[]> {
    return await this.observationRepository
      .createQueryBuilder('observation')
      .leftJoinAndSelect('observation.valueQuantity', 'quantity')
      .where('observation.subject.id = :id', { id: patientID })
      .getMany()
  }

  async searchPatientTest(
    patientID: number,
    testCode: string
  ): Promise<Observation[]> {
    return await this.observationRepository
      .createQueryBuilder('observation')
      .leftJoinAndSelect('observation.code', 'code')
      .leftJoinAndSelect('code.coding', 'coding')
      .leftJoinAndSelect('observation.valueQuantity', 'quantity')
      .where('observation.subject.id = :id', { id: patientID })
      .andWhere('coding.code = :code', { code: testCode })
      .getMany()
  }

  async getObservation(_id: number): Promise<Observation> {
    return await this.observationRepository
      .createQueryBuilder('observation')
      .where('observation.id = :id', { id: _id })
      .getOne()
  }

  async createObservation(observation: Observation) {
    console.log('The service observation is ' + JSON.stringify(observation))
    return await this.observationRepository.save(observation)
  }

  async createAndLink(observation: Observation, sid: string) {
    const obs = await this.observationRepository.save(observation)
    await getConnection()
      .createQueryBuilder()
      .relation(Observation, 'subject')
      .of(obs)
      .set(sid)
    return obs
  }

  async updateObservation(observation: Observation) {
    return await this.observationRepository.update(observation.id, observation)
  }

  async deleteObservation(_id: number) {
    return await this.observationRepository.delete(_id)
  }
}
