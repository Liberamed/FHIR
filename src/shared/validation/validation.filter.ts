import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ValidationError
} from '@nestjs/common'

export class ValidationException extends BadRequestException {
  constructor(public validationErrors: ValidationError) {
    super()
  }
}

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    return response.status(400).json({
      statusCode: 400,
      success: false,
      message: 'Bad Request: Failed Validation',
      error: exception.validationErrors
    })
  }
}
