import { Body, Put } from '@nestjs/common'
import { Controller } from '@nestjs/common'
import { CodeableConcept } from './codeableconcept.entity'
import { CodeableConceptService } from './codeableconcept.service'

@Controller('api/cc')
export class CodeableConceptController {
  constructor(private service: CodeableConceptService) {}

  @Put()
  create(@Body() cc: CodeableConcept) {
    return this.service.create(cc)
  }
}
