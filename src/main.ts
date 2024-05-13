import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationError, ValidationPipe } from '@nestjs/common'
import {
  ValidationException,
  ValidationFilter
} from './shared/validation/validation.filter'

//import { AuthGuard } from './auth/auth.guard'
//import { CognitoService } from './auth/cognito/cognito.service'
//import { CognitoConfig } from './auth/cognito/cognito.config'

//global['fetch'] = require('node-fetch')

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  //app.setGlobalPrefix('qhin/')
  const config = new DocumentBuilder()
    .setTitle('QHIN')
    .setDescription('The QHIN API description')
    .setVersion('0.0.2')
    .addTag('qhin')
    .addTag('fhir')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('apidoc', app, document)

  //  app.useGlobalGuards(
  //    new AuthGuard(
  //      new CognitoService(
  //        new CognitoConfig())))

  // validation filters
  app.useGlobalFilters(new ValidationFilter())
  app.useGlobalPipes(
    new ValidationPipe({
      validateCustomDecorators: true,
      skipMissingProperties: false,
      exceptionFactory: (errors: ValidationError[]) => {
        const errMsg: ValidationError = Object()
        errors.forEach((err) => {
          errMsg[err.property] = [...Object.values(err.constraints)]
        })
        return new ValidationException(errMsg)
      }
    })
  )

  app.enableCors()
  await app.listen(process.env.PORT)
}

bootstrap()
