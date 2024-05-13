import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Param,
  Post,
  UseGuards
} from '@nestjs/common'
import { PractitionerService } from './practitioner.service'
import { AuthGuard } from '@nestjs/passport'
import { CreatePractitionerDto } from './dto/create-practitioner.dto'
import { UpdatePractitionerDto } from './dto/update-practitioner.dto'

@Controller('api/practitioner')
export class PractitionerController {
  constructor(private service: PractitionerService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() practitioner: CreatePractitionerDto) {
    return this.service.create(practitioner)
  }

  @Get()
  findAll() {
    return this.service.findAll()
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePractitionerDto: UpdatePractitionerDto
  ) {
    return this.service.update(+id, updatePractitionerDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param() params) {
    return this.service.remove(params.id)
  }

  @Get('/npi/:npi')
  getByNPI(@Param() params) {
    return this.service.getByNPI(params.npi)
  }
}
