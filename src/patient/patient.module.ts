import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Patient } from './entities/patient.entity'
import { PatientAddress } from './entities/address.entity'
import { PatientIdentifier } from './entities/identifier.entity'
import { PatientName } from './entities/humanname.entity'
import { PatientService } from './patient.service'
import { PatientController } from './patient.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Patient,
      PatientIdentifier,
      PatientAddress,
      PatientName
    ])
  ],
  providers: [PatientService],
  controllers: [PatientController]
})
export class PatientModule {}
