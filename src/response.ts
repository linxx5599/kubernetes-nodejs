import {
  NestInterceptor,
  CallHandler,
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Response } from 'express';

interface Data<T> {
  data: T;
}

//成功返回统一处理结构
export class HttpResponse<T> implements NestInterceptor {
  intercept(context, next: CallHandler): Observable<Data<T>> {
    return next.handle().pipe(map((data) => data.body));
  }
}

@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();
    let err = { message: exception.message };
    if (exception['response']) {
      err = exception['response'];
    }

    res.status(status).json(err);
  }
}
