import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AddTokenInterceptor<T> implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = request;
    const token = sessionStorage.getItem('token');
    if (token) {
      const headers = { 'x-booking-token': token };

      authReq = request.clone({
        setHeaders: headers,
      });
    }
    return next.handle(authReq);
  }
}
