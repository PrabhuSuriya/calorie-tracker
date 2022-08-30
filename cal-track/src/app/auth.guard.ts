import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AccountService } from './services/account.service';

// Allow only is user is logged in
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private accountSvc: AccountService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isLoggedIn = this.accountSvc.isLoggedIn;
    if (!isLoggedIn) {
      this.router.navigate(['login']);
    }
    return isLoggedIn;
  }
}
