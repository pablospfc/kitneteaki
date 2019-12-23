import {Injectable, Injector} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpClient
} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, flatMap, map} from 'rxjs/operators';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
          const error = (typeof errorResponse.error !== 'object') ? JSON.parse(errorResponse.error) : errorResponse;
          if (errorResponse.status === 401 && error.error[0] === 'token_expired') {
            const http = this.injector.get(HttpClient);
            return http.post<any>(`${environment.API}/auth/refresh`, {})
              .pipe(
                flatMap(data => {
                  localStorage.setItem('token', data.token);
                  const cloneRequest = request.clone({setHeaders: {'Authorization': `Bearer ${data.token}`}});

                  return next.handle(cloneRequest);
                })
              );
          }
          return throwError(errorResponse.error);
        })
      );

  }

    }
