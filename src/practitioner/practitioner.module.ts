import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Practitioner } from './entities/practitioner.entity'
import { PractitionerController } from './practitioner.controller'
import { PractitionerService } from './practitioner.service'
import { QualificationModule } from './qualification/qualification.module'
import { PractitionerIdentifier } from './entities/identifier.entity'
import { PractitionerAddress } from './entities/address.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Practitioner,
      PractitionerAddress,
      PractitionerIdentifier
    ]),
    QualificationModule
  ],
  controllers: [PractitionerController],
  providers: [PractitionerService]
})
export class PractitionerModule {}
