import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AccountService } from './services/account.service';

const URLS_TO_EXCLUDE = ['/login', '/signup'];
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router, private accountSvc: AccountService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request && !URLS_TO_EXCLUDE.some((x) => request.url.includes(x))) {
      if (this.accountSvc.isLoggedIn) {
        const token = this.accountSvc.token;
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        this.router.navigate(['login']);
      }
    }
    return next.handle(request);
  }
}
