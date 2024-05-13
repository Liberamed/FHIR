import { PatientModule } from './patient/patient.module'
import { PersonModule } from './person/person.module'
import { EncounterModule } from './encounter/encounter.module'
import { IdentifierModule } from './shared/identifier/identifier.module'

export const qhinRoutes = [
  {
    path: process.env.QHIN,
    //module: AppModule,
    children: [
      {
        path: 'encounter',
        module: EncounterModule,
      },
      {
        path: 'identifier',
        module: IdentifierModule,
      },
      {
        path: 'patient',
        module: PatientModule,
      },
      {
        path: 'person',
        module: PersonModule,
      },

    ],
  },
]