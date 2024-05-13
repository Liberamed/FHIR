import { Identifier } from './identifier.entity'
import { PartialType } from '@nestjs/mapped-types'

export class CreateIdentifierDto extends PartialType(Identifier) {}
