import { Injectable } from '@nestjs/common'
import { CodeableConcept } from './codeableconcept.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class CodeableConceptService {
  constructor(
    @InjectRepository(CodeableConcept)
    private ccRepository: Repository<CodeableConcept>
  ) {}

  async create(cc: CodeableConcept) {
    return await this.ccRepository.save(cc)
  }
}
