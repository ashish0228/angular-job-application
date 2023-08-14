import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { toasterClass } from "../toaster/toaster.class";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private toaster: toasterClass,
    private authService: AuthService,
    private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 403 ) {
        this.toaster.showToaster('error', error.error.message);
        localStorage.removeItem('user');
        localStorage.setItem('isLogin', 'false');
        this.authService.setLoginValue(false);
        this.router.navigate(['/login']);
      }

      if (error.status === 404 ) {
        this.toaster.showToaster('error', error.error.message);
      }

      if(error.status === 500) {
        this.toaster.showToaster('error', error.error.message);
      }
      return throwError(error.error);
    }))
  }
}
