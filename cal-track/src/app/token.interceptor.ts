import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from './services/account.service';

const URLS_TO_EXCLUDE = ['/login', '/signup'];

// adds jwt token to all the requests
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
