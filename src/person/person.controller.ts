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
import { PersonService } from './person.service'
//import { Roles } from '../shared/guards/roles/roles.decorator'
import { LoggingInterceptor } from '../shared/interceptors/logging.interceptor'
//import { Encounter } from '../encounter/encounter.entity'
import { AuthGuard } from '@nestjs/passport'
import { CreatePersonDto } from './dto/create-person.dto'
import { UpdatePersonDto } from './dto/update-person.dto'
import { Permissions } from '../authz/permissions/permissions.decorator'
import { PermissionsGuard } from '../authz/permissions/permissions.guard'
import { UserToken } from '../authz/decorators/userToken.decorator'
import { UserDto } from '../authz/user/dto/user.dto'

@UseInterceptors(LoggingInterceptor)
@Controller()
//@UseGuards(RolesGuard)
export class PersonController {
  constructor(private service: PersonService) {}

  //@UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() person: CreatePersonDto) {
    return this.service.create(person)
  }

  @Get()
  findAll() {
    return this.service.findAll()
  }

  //@UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  //@Permissions('read:persons')
  findOne(@Param('id') id: string, @UserToken() user: UserDto) {
    console.log(user.sub)
    return this.service.findOne(+id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/identifiers/:id')
  //@Permissions('read:persons')
  findOneWithIdentifiers(@Param('id') id: string, @UserToken() user: UserDto) {
    console.log(user.sub)
    return this.service.findOneWithIdentifiers(+id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/names/:id')
  //@Permissions('read:persons')
  findOneWithNames(@Param('id') id: string, @UserToken() user: UserDto) {
    console.log(user.sub)
    return this.service.findOneWithNames(+id)
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get('/r/Person')
  //@Permissions('read:persons')
  findMine(@Param('id') id: string, @UserToken() person: UserDto) {
    //console.log(person.sub)
    return this.service.findMy(person)
  }

  //@UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.service.update(+id, updatePersonDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param() params) {
    return this.service.remove(params.id)
  }
}
