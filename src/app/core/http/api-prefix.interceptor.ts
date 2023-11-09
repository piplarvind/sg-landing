import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';

/**
 * Prefixes all requests with `environment.serverUrl`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('interceptor ::', request);

    // Check if it's a GET request and has a specific header or other criteria
    if (request.method === 'GET' && request.url.includes('vimeo')) {
      // If it meets the criteria, pass the request through without intercepting
      return next.handle(request);
    }
    
    request = request.clone({ url: environment.serverUrl + request.url });
    return next.handle(request);
  }

}
