import { PartialType } from '@nestjs/mapped-types'
import { Patient } from '../entities/patient.entity'

export class UpdatePatientDto extends PartialType(Patient) {}
