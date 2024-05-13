import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Person } from './entities/person.entity'
import { PersonAddress } from './entities/address.entity'
import { PersonIdentifier } from './entities/identifier.entity'
import { PersonName } from './entities/humanname.entity'
import { PersonService } from './person.service'
import { PersonController } from './person.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Person,
      PersonIdentifier,
      PersonAddress,
      PersonName
    ])
  ],
  providers: [PersonService],
  controllers: [PersonController]
})
export class PersonModule {}
