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
import { PersonIdentifierService } from './service'
import { PersonIdentifier } from '../../../person/entities/identifier.entity'

@Controller('/person')
export class PersonIdentifierController {
  constructor(private service: PersonIdentifierService) {}

  @Get()
  findAllForPerson(@Query() query) {
    return this.service.searchPersonIdentifiers(query.personID)
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
  create(@Body() identifier: PersonIdentifier) {
    console.log('The controller identifier is ' + JSON.stringify(identifier))
    return this.service.createIdentifier(identifier)
  }

  //@Post('/:ptID')
  //searchPerson(@Param() params) {
  //    console.log("The controller person is " + JSON.stringify(person))
  //    return this.service.searchPersonIdentifiers(person)
  //}

  @Put()
  update(@Body() identifier: PersonIdentifier) {
    return this.service.updateIdentifier(identifier)
  }

  @Put(':sid')
  createAndLink(@Body() identifier: PersonIdentifier, @Param() params) {
    return this.service.createAndLink(identifier, params.sid)
  }

  @Delete(':id')
  deleteIdentifier(@Param() params) {
    return this.service.deleteIdentifier(params.id)
  }
}
