import {
  Injectable,
  CallHandler,
  ExecutionContext,
  NestInterceptor
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...')
    const now = Date.now()

    const request = context.switchToHttp().getRequest() as Request
    console.log('The request is ' + request.method)

    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)))
  }
}
