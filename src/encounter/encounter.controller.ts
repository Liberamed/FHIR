import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
  UseGuards
} from '@nestjs/common'
import { EncounterService } from './encounter.service'
import { Period } from '../shared/period/period.entity'
import { AuthGuard } from '@nestjs/passport'
import { CreateEncounterDto } from './dto/create-encounter.dto'
import { UpdateEncounterDto } from './dto/update-encounter.dto'

@Controller('encounter')
export class EncounterController {
  constructor(private service: EncounterService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() encounter: CreateEncounterDto) {
    return this.service.create(encounter)
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
    @Body() updateEncounterDto: UpdateEncounterDto
  ) {
    return this.service.update(+id, updateEncounterDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param() params) {
    return this.service.remove(params.id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteEncounter(@Param() params) {
    return this.service.deleteEncounter(params.id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('remove/period')
  deleteEncountersPeriod(@Body() period: Period) {
    console.log('The enccntrlr delete period is ' + JSON.stringify(period))
    return this.service.deleteEncountersPeriod(period)
  }
}
