import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/auth.models';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user!: User;

  constructor(private accountSvc: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.accountSvc.userUpdated$.subscribe((data) => {
      console.log('asd', data);
      this.user = data;
    });
  }

  logOut() {
    this.accountSvc.logout();
    this.router.navigate(['login']);
  }
}
