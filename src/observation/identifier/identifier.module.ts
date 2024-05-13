import { TypeOrmModule } from '@nestjs/typeorm'
import { ObservationIdentifier } from '../entities/identifier.entity'
import { Module } from '@nestjs/common'

@Module({
  imports: [TypeOrmModule.forFeature([ObservationIdentifier])]
})
export class ObservationIdentifierModule {}
