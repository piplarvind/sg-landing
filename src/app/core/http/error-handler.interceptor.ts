import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger } from '@app/core/logger.service';
import { Router } from '@angular/router';

const log = new Logger('ErrorHandlerInterceptor');

/**
 * Adds a default error handler to all requests.
 */
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler(error))
    );
  }

  // Customize the default error handler here if needed
  private errorHandler(error: HttpErrorResponse): Observable<HttpEvent<any>> {
    if (!environment.production) {
      // Do something with the error
      log.error('Request error', error);
    }

    if (error.status === 404) {
      const message = {
        code: 'Expired',
        message: 'Session Expired. Please login again'
      };

      this.router.navigate(['/login', message]);
    }

    return throwError(error);
  }
}
