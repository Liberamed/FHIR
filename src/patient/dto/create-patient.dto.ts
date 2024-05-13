import { Equals } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types'
import { Patient } from '../entities/patient.entity'
import { AdministrativeGender } from '../entities/patient.entity'

export class CreatePatientDto extends PartialType(Patient) {
  @Equals('Patient')
  resourceType: string;
  
}
