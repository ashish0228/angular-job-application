import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user') || '');
      const modifiedReq = req.clone({ headers: req.headers.set('Authorization',  'Bearer ' + user.accessToken)});

      return next.handle(modifiedReq);
    }
    const modifiedReq = req.clone({});
    return next.handle(modifiedReq);
  }
}
