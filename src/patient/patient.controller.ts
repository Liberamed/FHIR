import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { PatientService } from './patient.service'
//import { Roles } from '../shared/guards/roles/roles.decorator'
import { LoggingInterceptor } from '../shared/interceptors/logging.interceptor'
//import { Encounter } from '../encounter/encounter.entity'
import { AuthGuard } from '@nestjs/passport'
import { CreatePatientDto } from './dto/create-patient.dto'
import { UpdatePatientDto } from './dto/update-patient.dto'
import { Permissions } from '../authz/permissions/permissions.decorator'
import { PermissionsGuard } from '../authz/permissions/permissions.guard'
import { UserToken } from '../authz/decorators/userToken.decorator'
import { UserDto } from '../authz/user/dto/user.dto'

@UseInterceptors(LoggingInterceptor)
  @UseGuards(AuthGuard('jwt'))
@Controller()
//@UseGuards(RolesGuard)
export class PatientController {
  constructor(private service: PatientService) {}

  //@UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() patient: CreatePatientDto) {
    return this.service.create(patient)
  }

  @Get()
  findAll() {
    return this.service.findAll()
  }

  //@UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  //@Permissions('read:patients')
  findOne(@Param('id') id: string, @UserToken() user: UserDto) {
    console.log(user.sub)
    return this.service.findOne(+id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/identifiers/:id')
  //@Permissions('read:patients')
  findOneWithIdentifiers(@Param('id') id: string, @UserToken() user: UserDto) {
    console.log(user.sub)
    return this.service.findOneWithIdentifiers(+id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/names/:id')
  //@Permissions('read:patients')
  findOneWithNames(@Param('id') id: string, @UserToken() user: UserDto) {
    console.log(user.sub)
    return this.service.findOneWithNames(+id)
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get('/r/Patient')
  //@Permissions('read:patients')
  findMine(@Param('id') id: string, @UserToken() patient: UserDto) {
    //console.log(patient.sub)
    return this.service.findMy(patient)
  }

  //@UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.service.update(+id, updatePatientDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param() params) {
    return this.service.remove(params.id)
  }
}
