import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { Diagnosis } from './entities/diagnosis.entity'
import { Encounter } from './entities/encounter.entity'
import { EncounterIdentifier } from './entities/identifier.entity'
import { EncounterParticipant } from './entities/participant.entity'
import { EncounterController } from './encounter.controller'
import { EncounterService } from './encounter.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Encounter,
      EncounterParticipant,
      EncounterIdentifier,
      Diagnosis
    ])
  ],
  controllers: [EncounterController],
  providers: [EncounterService]
})
export class EncounterModule {}
