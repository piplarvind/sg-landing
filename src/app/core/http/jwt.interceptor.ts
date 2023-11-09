import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';

/**
 * Prefixes all requests with `environment.serverUrl`.
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if (!/^(http|https):/i.test(request.url)) {
    //   request = request.clone({ url: environment.serverUrl + request.url });
    // }

    // Check if it's a GET request and has a specific header or other criteria
    if (request.method === 'GET' && request.url.includes('vimeo')) {
      // If it meets the criteria, pass the request through without intercepting
      return next.handle(request);
    }

    const currentUser: any = localStorage;

    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }

    return next.handle(request);
  }
}
