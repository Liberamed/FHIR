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
import { ObservationService } from './observation.service'
import { Observation } from './entities/observation.entity'

@Controller('api/observation')
export class ObservationController {
  constructor(private service: ObservationService) {}

  @Get()
  findAllForPatient(@Query() query) {
    return this.service.searchPatientObservations(query.patientID)
  }

  @Get('/athena/:aid')
  getAthenaID(@Param() params) {
    return this.service.searchAthena(params.aid)
  }

  @Get('/glucose')
  findGlucoseForPatient(@Query() query) {
    return this.service.searchPatientTest(query.patientID, '41653-7')
  }

  @Get('/hba1c')
  findHba1cForPatient(@Query() query) {
    return this.service.searchPatientTest(query.patientID, '4548-4')
  }

  @Get('/:id')
  get(@Param() params) {
    return this.service.getObservation(params.id)
  }

  @Post()
  create(@Body() observation: Observation) {
    console.log('The controller observation is ' + JSON.stringify(observation))
    return this.service.createObservation(observation)
  }

  //@Post('/:ptID')
  //searchPatient(@Param() params) {
  //    console.log("The controller patient is " + JSON.stringify(patient))
  //    return this.service.searchPatientObservations(patient)
  //}

  @Put()
  update(@Body() observation: Observation) {
    return this.service.updateObservation(observation)
  }

  @Put(':sid')
  createAndLink(@Body() observation: Observation, @Param() params) {
    return this.service.createAndLink(observation, params.sid)
  }

  @Delete(':id')
  deleteObservation(@Param() params) {
    return this.service.deleteObservation(params.id)
  }
}
