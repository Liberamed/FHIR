import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'
//import { CodeableConceptModule } from './codeableconcept/codeableconcept.module'
import { IdentifierModule } from './shared/identifier/identifier.module'
import { PatientModule } from './patient/patient.module'
import { PersonModule } from './person/person.module'
import { ObservationModule } from './observation/observation.module'
//import { CodeableConceptModule } from './codeableconcept/codeableconcept.module'
import { PractitionerModule } from './practitioner/practitioner.module'
//import { AuthModule } from './auth/auth.module'
//import { CognitoModule } from './auth/cognito/cognito.module'
import { EncounterModule } from './encounter/encounter.module'
import { ConditionModule } from './condition/condition.module'
import { AuthzModule } from './authz/authz.module'
import { AppointmentModule } from './appointment/appointment.module'
//import * as ormconfig from './ormconfig'
import * as Joi from 'joi'
import { DatabaseModule } from './database/database.module'
import { qhinRoutes } from './routes'

@Module({
  imports: [
    RouterModule.register(qhinRoutes),
    DatabaseModule,
    //TypeOrmModule.forRoot(ormconfig),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number()
      }),
      envFilePath: ['.env', '.env.development', '.env.production'],
      isGlobal: true
    }),
    IdentifierModule,
    PatientModule,
    PersonModule,
    AuthzModule,
    ObservationModule,
    //CodeableConceptModule,
    PractitionerModule,
    //AuthModule,
    //CognitoModule,
    EncounterModule,
    ConditionModule,
    AppointmentModule
  ]
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule {}
