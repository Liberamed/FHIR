import { PatientIdentifier } from '../../patient/entities/identifier.entity'
import { PatientIdentifierService } from './patient/service'
import { PatientIdentifierController } from './patient/controller'
import { PersonIdentifier } from '../../person/entities/identifier.entity'
import { PersonIdentifierService } from './person/service'
import { PersonIdentifierController } from './person/controller'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([PatientIdentifier,
    PersonIdentifier])],
  providers: [PatientIdentifierService,
    PersonIdentifierService],
  controllers: [PatientIdentifierController,
    PersonIdentifierController]
})
export class IdentifierModule {}
