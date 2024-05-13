import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { CodeableConceptController } from './codeableconcept.controller'
import { CodeableConceptService } from './codeableconcept.service'
import { CodeableConcept } from './codeableconcept.entity'
import { CodingModule } from './coding/coding.module'

@Module({
  imports: [CodingModule, TypeOrmModule.forFeature([CodeableConcept])],
  controllers: [CodeableConceptController],
  providers: [CodeableConceptService]
})
export class CodeableConceptModule {}
