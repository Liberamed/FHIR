import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  Query
} from '@nestjs/common'
import { PatientIdentifierService } from './service'
import { PatientIdentifier } from '../../../patient/entities/identifier.entity'

@Controller('/patient')
export class PatientIdentifierController {
  constructor(private service: PatientIdentifierService) {}

  @Get()
  findAllForPatient(@Query() query) {
    return this.service.searchPatientIdentifiers(query.patientID)
  }

  @Get('/athena/:aid')
  getAthenaID(@Param() params) {
    return this.service.searchAthena(params.aid)
  }

  @Get('/:id')
  get(@Param() params) {
    return this.service.getIdentifier(params.id)
  }

  @Post()
  create(@Body() identifier: PatientIdentifier) {
    console.log('The controller identifier is ' + JSON.stringify(identifier))
    return this.service.createIdentifier(identifier)
  }

  //@Post('/:ptID')
  //searchPatient(@Param() params) {
  //    console.log("The controller patient is " + JSON.stringify(patient))
  //    return this.service.searchPatientIdentifiers(patient)
  //}

  @Put()
  update(@Body() identifier: PatientIdentifier) {
    return this.service.updateIdentifier(identifier)
  }

  @Put(':sid')
  createAndLink(@Body() identifier: PatientIdentifier, @Param() params) {
    return this.service.createAndLink(identifier, params.sid)
  }

  @Delete(':id')
  deleteIdentifier(@Param() params) {
    return this.service.deleteIdentifier(params.id)
  }
}
