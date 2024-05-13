import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { getConnection, Repository } from 'typeorm'
import { PatientIdentifier } from '../../../patient/entities/identifier.entity'

@Injectable()
export class PatientIdentifierService {
  constructor(
    @InjectRepository(PatientIdentifier)
    private identifierRepository: Repository<PatientIdentifier>
  ) {}

  async searchAthena(aid: number): Promise<PatientIdentifier> {
    return await this.identifierRepository
      .createQueryBuilder('identifier')
      .leftJoinAndSelect('identifier.identifier', 'identifier')
      .where('identifier.assigner LIKE :assigner', { assigner: 'Athena' })
      .andWhere('identifier.value = :val', { val: aid })
      .getOne()
  }

  async searchPatientIdentifiers(
    patientID: number
  ): Promise<PatientIdentifier[]> {
    return await this.identifierRepository
      .createQueryBuilder('identifier')
      .leftJoinAndSelect('identifier.valueQuantity', 'quantity')
      .where('identifier.subject.id = :id', { id: patientID })
      .getMany()
  }

  async getIdentifier(_id: number): Promise<PatientIdentifier> {
    return await this.identifierRepository
      .createQueryBuilder('identifier')
      .where('identifier.id = :id', { id: _id })
      .getOne()
  }

  async createIdentifier(identifier: PatientIdentifier) {
    console.log('The service identifier is ' + JSON.stringify(identifier))
    return await this.identifierRepository.save(identifier)
  }

  async createAndLink(identifier: PatientIdentifier, pid: string) {
    let idfr
    try {
      idfr = await this.identifierRepository.save(identifier)
    } catch (error) {
      //console.log("\n\n\n", 'The caught error is ', error.detail)
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: error.detail
        },
        HttpStatus.CONFLICT,
        {
          cause: error
        }
      )
    }
    await this.identifierRepository
      .createQueryBuilder()
      .relation(PatientIdentifier, 'patient')
      .of(idfr)
      .set(pid)

    return idfr
  }

  async updateIdentifier(identifier: PatientIdentifier) {
    return await this.identifierRepository.update(identifier.id, identifier)
  }

  async deleteIdentifier(_id: number) {
    return await this.identifierRepository.delete(_id)
  }
}
