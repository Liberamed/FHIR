import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Observation } from './entities/observation.entity'
import { ObservationController } from './observation.controller'
import { ObservationService } from './observation.service'
import { PatientModule } from '../patient/patient.module'
import { ObservationIdentifierModule } from './identifier/identifier.module'
import { PractitionerModule } from '../practitioner/practitioner.module'
import { CodeableConceptModule } from '../shared/codeableconcept/codeableconcept.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Observation]),
    ObservationIdentifierModule,
    PatientModule,
    PractitionerModule,
    CodeableConceptModule
  ],
  controllers: [ObservationController],
  providers: [ObservationService]
})
export class ObservationModule {}
