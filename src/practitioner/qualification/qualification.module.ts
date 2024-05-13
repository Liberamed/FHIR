import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Qualification } from './entities/qualification.entity'
import { QualificationIdentifier } from './entities/identifier.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Qualification, QualificationIdentifier])]
})
export class QualificationModule {}
